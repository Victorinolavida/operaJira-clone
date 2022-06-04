
import {  CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { EntriesProvider } from '../context/entries'
import { UIprovider } from '../context/ui'
import { DarkTheme } from '../themes'
import { SnackbarProvider } from 'notistack';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <EntriesProvider>
        <UIprovider>
          <ThemeProvider theme={ DarkTheme }  >
          <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIprovider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}

export default MyApp
