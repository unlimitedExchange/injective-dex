import {
  BigNumber,
  BigNumberInWei,
  BigNumberInBase
} from '@injectivelabs/utils'
import { Network } from '@injectivelabs/networks'
import { ChainId } from '@injectivelabs/ts-types'

export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development'
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production'
export const METRICS_ENABLED: boolean = process.env.METRICS_ENABLED === 'true'
export const TRANSFER_RESTRICTIONS_ENABLED: boolean =
  process.env.TRANSFER_RESTRICTIONS_ENABLED === 'true'
export const GEO_IP_RESTRICTIONS_ENABLED: boolean =
  process.env.GEO_IP_RESTRICTIONS_ENABLED === 'true'

export const ZERO: BigNumber = new BigNumber(0)
export const ZERO_TO_STRING = '0'
export const ZERO_IN_WEI: BigNumberInWei = new BigNumberInWei(0)
export const ZERO_IN_BASE: BigNumberInBase = new BigNumberInBase(0)
export const UNLIMITED_ALLOWANCE: BigNumber = new BigNumber(2).pow(256).minus(1)

export const ZERO_ADDRESS: string = '0x0000000000000000000000000000000000000000'
export const ZERO_BYTES_32: string =
  '0x0000000000000000000000000000000000000000000000000000000000000000'
export const ZERO_MARKET_ID: string =
  '0x000000000000000000000000000000000000000000000000000000000000000000000000'
export const NULL_BYTES: string = '0x'

export const SECONDS_IN_A_DAY: BigNumber = new BigNumber(60 * 60 * 24)
export const GWEI_IN_WEI: BigNumber = new BigNumber(1000000000)

export const BASE_URL: string = process.env.APP_BASE_URL
export const FEE_RECIPIENT: string = process.env.APP_FEE_RECIPIENT
export const UI_DEFAULT_MIN_DISPLAY_DECIMALS = 2
export const UI_DEFAULT_DISPLAY_DECIMALS = 4
export const UI_DEFAULT_MAX_DISPLAY_DECIMALS = 6
export const UI_DEFAULT_PRICE_DISPLAY_DECIMALS = 4
export const UI_DEFAULT_AMOUNT_DISPLAY_DECIMALS = 4
export const UI_DEFAULT_AGGREGATION_DECIMALS = 3

export const NETWORK: Network = process.env.APP_NETWORK || Network.Testnet
export const IS_TESTNET = [
  Network.Testnet,
  Network.Devnet,
  Network.Local
].includes(NETWORK)

export const CHAIN_ID: ChainId = process.env.APP_CHAIN_ID
  ? parseInt(process.env.APP_CHAIN_ID.toString())
  : parseInt((IS_TESTNET ? ChainId.Kovan : ChainId.Mainnet).toString())

// 6 gwei for Kovan, fetched from gasStation for Mainnet
export const DEFAULT_GAS_PRICE = new BigNumber(6).times(GWEI_IN_WEI)
export const DEFAULT_PRICE_WARNING_DEVIATION = new BigNumber(5) // 5%
export const DEFAULT_MAX_SLIPPAGE = new BigNumber(5) // +1% slippage
export const DEFAULT_MAX_SLIPPAGE_FOR_CLOSING_POSITIONS = new BigNumber(100) // +1% slippage

export const MAX_DISPLAYABLE_NUMBER = new BigNumberInBase(1_000_000_000)
export const MAXIMUM_TRANSFER_ALLOWED = 1000
export const MAXIMUM_NOTIONAL_ALLOWED = 5000
export const INJECTIVE_DENOM = 'inj'
export const INJ_FEE_BUFFER = 0.01
export const GAS_LIMIT_MULTIPLIER = 1.2
export const BRIDGE_FEE_IN_USD = 10

// eslint-disable-next-line prefer-regex-literals
export const NUMBER_REGEX = new RegExp(/^-?(0|[1-9]\d*)?(\.\d+)?$/)
