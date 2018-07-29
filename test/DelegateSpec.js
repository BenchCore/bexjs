import { expect } from 'chai'
import * as api from '../src'

describe('delegate', () => {

  describe('api.getDelegates()', () => {
    it('should return top delegates list', () => {
      return api.getDelegates()
        .then((res) => {
          expect(res).to.be.an('array')
          expect(res.length).to.be.equal(51)
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getDelegates() params', () => {
    it('should return delegates list according to params', () => {
      return api.getDelegates({
        'limit': 5
      })
        .then((res) => {
          expect(res).to.be.an('array')
          expect(res.length).to.be.equal(5)
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getDelegateByUsername()', () => {
    it('should return delegate by username', () => {
      return api.getDelegateByUsername('nomoreheroes')
        .then((res) => {
          expect(res).to.be.an('object')
          expect(res.username).to.be.equal('nomoreheroes')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getDelegateByPublicKey()', () => {
    it('should return delegate by public key', () => {
      return api.getDelegateByPublicKey('0262968484084f50fcd1983e65a5a9db31ad98080c735a61f6261670b66deddcf6')
        .then((res) => {
          expect(res).to.be.an('object')
          expect(res.username).to.be.equal('nomoreheroes')
          expect(res.publicKey).to.be.equal('0262968484084f50fcd1983e65a5a9db31ad98080c735a61f6261670b66deddcf6')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getNextForgers()', () => {
    it('should return next forgers delegate list', () => {
      return api.getNextForgers()
        .then((res) => {
          expect(res).to.be.an('array')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getDelegateVoters()', () => {
    it('should return voters list from delegate', () => {
      return api.getDelegateVoters('0262968484084f50fcd1983e65a5a9db31ad98080c735a61f6261670b66deddcf6')
        .then((res) => {
          expect(res).to.be.an('array')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.searchDelegate()', () => {
    it('should return delegates according to search', () => {
      return api.searchDelegate('nomoreheroes')
        .then((res) => {
          expect(res).to.be.an('array')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

})
