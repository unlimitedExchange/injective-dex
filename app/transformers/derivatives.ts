import { BigNumber, BigNumberInBase } from '@injectivelabs/utils'
import {
  getTokenMetaDataBySymbol,
  getCoinGeckoId,
  getTokenMetaDataWithIbc
} from '../services/tokens'
import { grpcTokenMetaToToken, tokenMetaToToken } from './token'
import { getDecimalsFromNumber } from '~/app/utils/helpers'
import { derivatives as sortPerpetualMarkets } from '~/routes.config'
import { filteredMarkets as filterPerpetualMarkets } from '~/components/partials/derivatives/filter'
import {
  BaseUiDerivativeMarket,
  UiDerivativeMarket,
  DerivativeOrderSide,
  DerivativeMarketMap,
  UiDerivativeMarketSummary,
  BaseUiDerivativeMarketWithTokenMetaData,
  BaseUiDerivativeMarketWithPartialTokenMetaData,
  MarketType,
  Change
} from '~/types'

export const derivativeMarketToUiDerivativeMarket = (
  market: BaseUiDerivativeMarketWithTokenMetaData
): UiDerivativeMarket => {
  return {
    ...market,
    type: MarketType.Derivative,
    subType: MarketType.Perpetual,
    quantityDecimals: getDecimalsFromNumber(market.minQuantityTickSize),
    priceDecimals: getDecimalsFromNumber(
      new BigNumberInBase(market.minPriceTickSize)
        .toWei(-market.quoteToken.decimals)
        .toNumber()
    )
  }
}

export const baseUiDerivativeMarketToBaseUiDerivativeMarketWithPartialTokenMetaData = async (
  market: BaseUiDerivativeMarket
): Promise<BaseUiDerivativeMarketWithPartialTokenMetaData> => {
  const slug = market.ticker
    .replace('/', '-')
    .replaceAll(' ', '-')
    .toLowerCase()
  const [baseTokenSymbol] = slug.split('-')
  const baseToken = tokenMetaToToken(getTokenMetaDataBySymbol(baseTokenSymbol))
  const quoteToken = market.quoteToken
    ? grpcTokenMetaToToken(market.quoteToken, market.quoteDenom)
    : tokenMetaToToken(
        await getTokenMetaDataWithIbc(market.quoteDenom),
        market.quoteDenom
      )

  if (quoteToken && !quoteToken.coinGeckoId) {
    quoteToken.coinGeckoId = getCoinGeckoId(quoteToken.symbol)
  }

  return {
    ...market,
    slug,
    baseToken,
    quoteToken
  }
}

export const derivativeMarketsToUiDerivativeMarkets = async (
  markets: BaseUiDerivativeMarket[]
): Promise<UiDerivativeMarket[]> => {
  const tokenMetaDataExists = (
    m: BaseUiDerivativeMarketWithPartialTokenMetaData
  ) => m.baseToken !== undefined && m.quoteToken !== undefined
  const filteredMarkets = (
    await Promise.all(
      markets.map((market) =>
        baseUiDerivativeMarketToBaseUiDerivativeMarketWithPartialTokenMetaData(
          market
        )
      )
    )
  )
    .filter(tokenMetaDataExists)
    .filter((market) => sortPerpetualMarkets.includes(market.slug))
    .filter(
      (market) => !filterPerpetualMarkets.includes(market.slug)
    ) as BaseUiDerivativeMarketWithTokenMetaData[]

  const mappedMarkets = filteredMarkets.map((m) =>
    derivativeMarketToUiDerivativeMarket(m)
  )

  mappedMarkets.sort(function (a, b) {
    return (
      sortPerpetualMarkets.indexOf(a.slug) -
      sortPerpetualMarkets.indexOf(b.slug)
    )
  })

  return mappedMarkets
}

export const marketSummaryToUiMarketSummary = (
  oldSummary: UiDerivativeMarketSummary,
  newSummary: UiDerivativeMarketSummary
): UiDerivativeMarketSummary => {
  return {
    ...newSummary,
    lastPrice: oldSummary.price,
    lastPriceChange: new BigNumber(oldSummary.price).eq(newSummary.price)
      ? oldSummary.lastPriceChange || Change.NoChange
      : new BigNumber(newSummary.price).gte(oldSummary.price)
      ? Change.Increase
      : Change.Decrease
  }
}

export const marketsSummaryToUiMarketsSummary = (
  oldSummaries: UiDerivativeMarketSummary[] = [],
  newSummaries: UiDerivativeMarketSummary[] = []
): UiDerivativeMarketSummary[] => {
  return oldSummaries.map((oldSummary) => {
    const newSummary = newSummaries.find(
      (m) => m.marketId === oldSummary.marketId
    )

    // Sometimes, chronos returns zeros
    const actualNewSummary =
      newSummary && newSummary.price ? newSummary : oldSummary

    return marketSummaryToUiMarketSummary(oldSummary, actualNewSummary)
  })
}

export const orderTypeToGrpcOrderType = (
  orderType: DerivativeOrderSide
): DerivativeMarketMap => {
  switch (orderType) {
    case DerivativeOrderSide.Unspecified:
      return DerivativeMarketMap.UNSPECIFIED
    case DerivativeOrderSide.Buy:
      return DerivativeMarketMap.BUY
    case DerivativeOrderSide.Sell:
      return DerivativeMarketMap.SELL
    case DerivativeOrderSide.StopBuy:
      return DerivativeMarketMap.STOP_BUY
    case DerivativeOrderSide.StopSell:
      return DerivativeMarketMap.STOP_SELL
    case DerivativeOrderSide.TakeBuy:
      return DerivativeMarketMap.TAKE_BUY
    case DerivativeOrderSide.TakeSell:
      return DerivativeMarketMap.TAKE_SELL
    default:
      return DerivativeMarketMap.BUY
  }
}
