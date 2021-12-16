import {
  SpotMarket as BaseUiSpotMarket,
  SpotTrade,
  SpotLimitOrder as UiSpotLimitOrder,
  Orderbook as UiSpotOrderbook,
  ChronosSpotMarketSummary,
  SpotOrderSide,
  AllChronosSpotMarketSummary
} from '@injectivelabs/spot-consumer'
import { TradeDirection, TradeExecutionType } from '@injectivelabs/ts-types'
import { MarketType } from './enums'
import { Token } from './token'
import { Change, MarketBase } from '.'

export interface BaseUiSpotMarketWithPartialTokenMetaData
  extends Omit<BaseUiSpotMarket, 'quoteToken' | 'baseToken'> {
  slug: string
  quoteToken?: Token
  baseToken?: Token
}

export interface UiSpotTrade extends SpotTrade {
  ticker?: string
}

export interface BaseUiSpotMarketWithTokenMetaData
  extends Omit<BaseUiSpotMarket, 'quoteToken' | 'baseToken'> {
  slug: string
  quoteToken: Token
  baseToken: Token
}

export interface UiSpotMarket extends BaseUiSpotMarketWithTokenMetaData {
  priceDecimals: number
  quantityDecimals: number
  type: MarketType
  subType: MarketType
  marketBase?: MarketBase
}

export interface UiSpotMarketSummary extends ChronosSpotMarketSummary {
  marketId: string
  lastPrice?: number
  lastPriceChange?: Change
}

export interface UiSpotMarketAndSummary {
  market: UiSpotMarket
  summary: UiSpotMarketSummary
}

export enum SpotMarketMap {
  UNSPECIFIED = 0,
  BUY = 1,
  SELL = 2,
  STOP_BUY = 3,
  STOP_SELL = 4,
  TAKE_BUY = 5,
  TAKE_SELL = 6
}

export {
  UiSpotLimitOrder,
  TradeDirection,
  SpotOrderSide,
  TradeExecutionType,
  BaseUiSpotMarket,
  ChronosSpotMarketSummary,
  AllChronosSpotMarketSummary,
  UiSpotOrderbook
}
