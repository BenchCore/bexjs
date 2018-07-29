import { expect } from 'chai'
import * as api from '../src'

describe('API', () => {
  describe('api.setNetwork()', () => {
    it('should set network to Bench', () => {
      api.setNetwork('Bench')
      expect(api.getNetwork().label).to.be.equal('Bench')
    })
    // it('should set network to Bench', () => {
    //   api.setNetwork('Bench')
    //   expect(api.getNetwork().label).to.be.equal('Benchtest')
    // })
    it('network should remain the same no arguments', () => {
      api.setNetwork()
      expect(api.getNetwork().label).to.be.equal('Bench')
    })
    it('network should remain the same wrong arguments', () => {
      api.setNetwork('Network?')
      expect(api.getNetwork().label).to.be.equal('Bench')
    })
    it('should return correct Bench Test network', () => {
      api.setNetwork('BENCHTEST')
      expect(api.getNetwork().label).to.be.equal('Bench')
      api.setNetwork('BenchTESt')
      expect(api.getNetwork().label).to.be.equal('Bench')
    })
    it('should return correct Bench network', () => {
      api.setNetwork('Bench')
      expect(api.getNetwork().label).to.be.equal('Bench')
      api.setNetwork('Bench')
      expect(api.getNetwork().label).to.be.equal('Bench')
    })
    it('should set a particular endpoint Bench Test', () => {
      api.setNetwork('Bench', 'node1.bex.life')
      expect(api.getEndpoint()).to.be.equal('http://node1.bex.life')
    })
    it('should set a particular endpoint Bench', () => {
      api.setNetwork('Bench', 'node1.bex.life:6620')
      expect(api.getEndpoint()).to.be.equal('http://node1.bex.life:6620')
    })
    it('should set a particular endpoint Bench 2 ', () => {
      api.setNetwork('Bench', 'http://node2.bex.life')
      expect(api.getEndpoint()).to.be.equal('http://node2.bex.life')
    })
    // it('should set a particular endpoint Bench SSL', () => {
    //   api.setNetwork('Bench', 'http://node1.bex.life')
    //   expect(api.getEndpoint()).to.be.equal('http://node1.bex.life')
    // })
  })

  describe('api.getEndpoint()', () => {
    it('should return endpoint', () => {
      api.setNetwork('Bench')
      let endpoint = api.getEndpoint()
      expect(endpoint).to.be.equal('https://node1.bex.life')
      // api.setNetwork('Benchtest')
      // endpoint = api.getEndpoint()
      // expect(endpoint).to.be.equal('https://node1.bex.life')
    })
  })

  describe('api.query()', () => {
    it('should return error when wrong url query', () => {
      api.query('https://node1.bex.life/xxx')
        .then((res) => {
          expect(res).be.an.instanceOf(Error)
          expect(res.message).to.be.equal('Request failed with status code 404')
        })
    })
  })

  describe('api.queryBuilder()', () => {
    it('should return query url when object given', () => {
      const query = api.queryBuilder({
        'orderBy': 'desc',
        'limit': 5
      })
      expect(query).to.be.equal('orderBy=desc&limit=5')
    })
  })

  describe('api.post()', () => {
    it('should return error when wrong url post', () => {
      api.post('https://node1.bex.life/xxx')
        .then((res) => {
          expect(res).be.an.instanceOf(Error)
          expect(res.message).to.be.equal('Request failed with status code 404')
        })
    })
  })

  describe('api.getKeys()', () => {
    it('should return keys for Bench network', () => {
      api.setNetwork('Bench')
      const keys = api.getKeys()
      expect(keys.publicKey.length).to.be.equal(66)
      expect(keys.privateKey.length).to.be.equal(64)
      expect(keys.passphrase).to.be.a('string')
      expect(keys.address.charAt(0)).to.be.equal('A')
    })
    it('should return keys for Bench network', () => {
      api.setNetwork('Bench')
      const keys = api.getKeys()
      expect(keys.publicKey.length).to.be.equal(66)
      expect(keys.privateKey.length).to.be.equal(64)
      expect(keys.passphrase).to.be.a('string')
      expect(keys.address.charAt(0)).to.be.equal('D')
    })
    // it('should return keys for given passphrase', () => {
    //   api.setNetwork('Bench')
    //   const keys = api.getKeys('guess change hospital bubble mail tool this make finish victory sight recycle')
    //   expect(keys.address).to.be.equal('BFA9fbokw8DBUEXtH6S1U9mjixdJ3cTgWJ')
    //   expect(keys.publicKey).to.be.equal('036b1c19d0eb235f175847b81c5722dde382996e1caab02ec270735a0eb38ea3dd')
    //   expect(keys.privateKey).to.be.equal('73079e6c1ebce0c37cf824ee4132a7c2d6a3340cd80eea1aa23b566911b42005')
    // })
  })

  describe('api.getSeeds()', () => {
    it('should return seeds for current network Bench', () => {
      api.setNetwork('Bench')
      const seeds = api.getSeeds()
      expect(seeds).to.be.an('array')
      expect(seeds[0]).to.be.equal('https://node1.bex.life')
    })
    it('should return seeds for current network Bench', () => {
      api.setNetwork('Bench')
      const seeds = api.getSeeds()
      expect(seeds).to.be.an('array')
      expect(seeds[0]).to.be.equal( 'https://node1.bex.life')
    })
    it('should return BENCHTEST seeds', () => {
      const seeds = api.getSeeds('Bench')
      expect(seeds).to.be.an('array')
      expect(seeds[0]).to.be.equal('https://node1.bex.life')
    })
    it('should return BENCHTEST seeds', () => {
      const seeds = api.getSeeds('Bench')
      expect(seeds).to.be.an('array')
      expect(seeds[0]).to.be.equal('https://node1.bex.life')
    })
  })

  describe('api.getAllSeeds()', () => {
    it('should return all seeds', () => {
      const seeds = api.getAllSeeds()
      expect(seeds).to.be.haveOwnProperty('BENCH')
      expect(seeds).to.be.haveOwnProperty('BENCHTEST')
    })
  })

  describe('api.getSecondSignatureFee()', () => {
    it('should return fee for 2nd signature', () => {
      api.getSecondSignatureFee()
        .then((res) => {
          expect(res).to.be.a('number')
        })
        .catch((e) => {
          console.log(e)
          throw e
        })
    })
  })
})
