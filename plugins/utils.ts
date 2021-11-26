/* eslint-disable no-console */
import { Context } from '@nuxt/types'
import {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  IS_TESTNET
} from '~/app/utils/constants'

const isErrorExcludedFromReporting = (error: any): boolean => {
  const disabledMessages = [
    'Your country is restricted from trading on this relayer'
  ]
  const errorMessage =
    typeof error === 'object' && error !== null ? error.message : error || ''

  return (
    errorMessage.startsWith('Metamask:') ||
    errorMessage.includes('MetaMask') ||
    errorMessage.includes('Metamask') ||
    errorMessage.includes('metamask') ||
    disabledMessages.includes(errorMessage)
  )
}

const parseMessage = (error: any): string => {
  const message = error.message || error

  if (message.toLowerCase().includes('response closed')) {
    return 'Something happened. Please refresh the page.'
  }

  return message
}

export default ({ app }: Context, inject: any) => {
  inject('onRejected', (error: Error) => {
    app.$toast.error(parseMessage(error))

    if (IS_PRODUCTION && !isErrorExcludedFromReporting(error)) {
      app.$bugsnag.notify(error)
    }

    if (IS_DEVELOPMENT || IS_TESTNET) {
      console.error(error)
    }
  })

  inject('onError', (error: Error) => {
    app.$toast.error(parseMessage(error))

    if (IS_PRODUCTION && !isErrorExcludedFromReporting(error)) {
      app.$bugsnag.notify(error)
    }

    if (IS_DEVELOPMENT || IS_TESTNET) {
      console.error(error)
    }
  })

  inject('onConfirm', <T extends Function>(message: string, callback: T) => {
    app.$toast.clear()
    return app.$toast.show(message, {
      duration: 10000,
      action: [
        {
          class: 'text-primary-500',
          text: 'Confirm',
          onClick: (_e: any, toastObject: any) => {
            toastObject.goAway(0)
            callback()
          }
        },
        {
          class: 'text-gray-300',
          text: 'Cancel',
          onClick: (_e: any, toastObject: any) => {
            toastObject.goAway(0)
          }
        }
      ]
    })
  })
}
