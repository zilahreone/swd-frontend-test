'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from './lib/store'
import { Button, Flex } from 'antd'
import LangSwitch from './components/LangSwitch'
import './i18n';
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function StoreProvider({
  // count,
  children,
}: {
  // count: number
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  const { t } = useTranslation('ns1')
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    // storeRef.current.dispatch(initialState(count))
  }

  return <Provider store={storeRef.current}>
    <div>
      <Flex gap="small" align="start" justify="flex-end" >
        <LangSwitch />
        <Link href="/">
          <Button>{t('test2.button.home')}</Button>
        </Link>
      </Flex>
      {children}
    </div>
  </Provider>
}