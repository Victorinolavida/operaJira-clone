import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar, SideBar } from '../ui'

interface Props{
  title?:string
}

export const Layout:FC<PropsWithChildren<Props>> = ({title='Open Jira',children}) => {
  return (
    <Box>
        <Head>
          <title> { title } </title>
        </Head>

        {/* navbar */}
        <Navbar />
        {/* sidebar */}
        <SideBar />
      <Box sx={{ padding:'10px 20px' }}>
          {children}
      </Box>
    </Box>
  )
}
