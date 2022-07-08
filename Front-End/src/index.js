import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { QueryClient, QueryClientProvider } from 'react-query'
import Router from './routers.js'
import { CookiesProvider } from 'react-cookie'
import AppLayout from './layouts/App'

const queryClient = new QueryClient()

const App = () => {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <AppLayout renderRouter={Router} />
      </QueryClientProvider>
    </CookiesProvider>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
)
