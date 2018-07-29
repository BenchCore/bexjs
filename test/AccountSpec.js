import { expect } from 'chai'
import * as api from '../src'

const address = 'BShA4L1KdVdZAMFQWqSQS6zx7aCbsxcWgt'

describe('account', () => {
  api.setNetwork('Bench')

  describe('api.getBalance()', () => {
    it('should return balance from address', () => {
      return api.getBalance(address)
        .then((res) => {
          expect(res).to.be.a('number')
          expect(res).to.be.at.least(100000)
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    }).timeout(5000)
  })

  describe('api.getAccount()', () => {
    it('should return account details from address', () => {
      return api.getAccount(address)
        .then((res) => {
          expect(res.address).to.be.equal(address)
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getDelegatesFromAddress()', () => {
    it('should return delegates from address', () => {
      return api.getDelegatesFromAddress(address)
        .then((res) => {
          expect(res.length).to.be.equal(1)
          expect(res[0].username).to.be.equal('nomoreheroes')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getDelegatesFee()', () => {
    it('should return delegates fee', () => {
      return api.getDelegatesFee()
        .then((res) => {
          expect(res).to.be.a('number')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getPublicKey()', () => {
    it('should return public key from address', () => {
      return api.getPublicKey(address)
        .then((res) => {
          expect(res).to.be.equal('0262968484084f50fcd1983e65a5a9db31ad98080c735a61f6261670b66deddcf6')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

})
