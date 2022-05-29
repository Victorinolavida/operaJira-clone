import React from 'react'
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { NextPage } from 'next'
import { Layout } from '../components/layout/Layout'
import { EntryList, NewEntry } from '../components/ui'

export default function HomePage() {
  return (
    <Layout title='Home OpenJira' >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Card sx={{ height:'calc(100vh - 100px)' }}>
                  <CardHeader title='pendientes'/>
                      <NewEntry />
                      <EntryList status='pending' />
                </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Card sx={{ height:'calc(100vh - 100px)' }}>
                  <CardHeader title='progreso'/>
                  <EntryList status='in-progress'/>
                </Card>
            </Grid>


            <Grid item xs={12} sm={4}>
                <Card sx={{ height:'calc(100vh - 100px)' }}>
                  <CardHeader title='finalizadas'/>
                  <EntryList status='finished'/>
                  
                </Card>
            </Grid>

        </Grid>
    </Layout>

    )
}
