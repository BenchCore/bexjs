import { expect } from 'chai'
import * as api from '../src'

describe('Blocks', () => {
  api.setNetwork('Bench')

  describe('api.getBlocksHeight()', () => {
    it('should return block height', () => {
      return api.getBlocksHeight()
        .then((res) => {
          expect(res).to.be.a('number')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getBlockchainFee()', () => {
    it('should return block fee', () => {
      return api.getBlockchainFee()
        .then((res) => {
          expect(res).to.be.a('number')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getBlocks()', () => {
    it('should return an array of blocks', () => {
      return api.getBlocks()
        .then((res) => {
          expect(res).to.be.an('array')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    }).timeout(5000)
  })

  describe('api.getBlocks()', () => {
    it('should return an array of blocks according to params', () => {
      return api.getBlocks({
        'limit': 5,
        'orderBy': 'height:asc'
      })
        .then((res) => {
          expect(res).to.be.an('array')
          expect(res.length).to.be.equal(5)
          expect(res[1].height).to.be.equal(res[0].height + 1)
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    }).timeout(5000)
  })

  describe('api.getBlock()', () => {
    it('should return block details', () => {
      api.setNetwork('Bench')
      return api.getBlock('111566430578087670')
        .then((res) => {
          expect(res).to.be.an('object')
          expect(res.height).to.be.equal(44)
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    }).timeout(5000)
  })

  describe('api.getNetHash()', () => {
    it('should return net hash', () => {
      api.setNetwork('Bench')
      return api.getNetHash()
        .then((res) => {
          expect(res).to.be.equal('3a832f6849162ee605da8251cf9f94b228a82a8989cc3a2abdeb4a8c18cb41b6')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    }).timeout(5000)
  })

  describe('api.getEpoch()', () => {
    it('should return blockchain epoch', () => {
      return api.getEpoch()
        .then((res) => {
          expect(res).to.be.equal('2017-03-21T13:00:00.000Z')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getReward()', () => {
    it('should return block forging reward', () => {
      return api.getReward()
        .then((res) => {
          expect(res).to.be.an('number')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getSupply()', () => {
    it('should return blockchain supply', () => {
      return api.getSupply()
        .then((res) => {
          expect(res).to.be.an('number')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })

  describe('api.getStatus()', () => {
    it('should return blockchain status', () => {
      return api.getStatus()
        .then((res) => {
          expect(res.epoch).to.be.equal('2017-03-21T13:00:00.000Z')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })
})
