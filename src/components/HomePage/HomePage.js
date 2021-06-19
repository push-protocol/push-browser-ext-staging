import React from 'react'
import firebase from 'firebase'
import { useEffect, useState } from 'react'
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import AddressPage from '../AddressPage/AddressPage'
import { getToken } from '../firebase'
const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
export default function Home() {
  const [token, setToken] = useState('')
  const classes = useStyles()
  useEffect(() => {
    console.log("home")
    // console.log(getToken())
    getToken().then((res) => {console.log(res);setToken(res)})
  }, [])
  return (
    <div style={{ height: '550px', width: '350px' }}>
      <Container component="main" maxWidth="xs">
        <Typography component="h4" variant="h3">
          Welcome!
        </Typography>
        <div>
          <Typography>
            Welcome to <b>Ethereum Push Notification Service</b> (EPNS)
          </Typography>
        </div>

        <div>
          <Typography>
            <b>EPNS</b> is an innovative way to receive notifications from
          </Typography>
        </div>
        <div>
          <Typography>
            different <b>dApps</b> or <b>Smart Contracts</b>.
          </Typography>
        </div>
        <div>
          {' '}
          <Typography>
            Think notifications but coming from blockchain ecosystem.
          </Typography>
        </div>
        <div>
          <Typography>
            Visit <a href="https://epns.io/">epns.io</a> to learn more about it
          </Typography>
        </div>
        <Link component={AddressPage} props={{ token }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Next
          </Button>
        </Link>
      </Container>
    </div>
  )
}
