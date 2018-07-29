import axios from 'axios'
import bench from 'bcorejs'
import Mnemonic from 'bitcore-mnemonic'
import { getNetHash } from './block'
import seeds from './seeds'

export const networksType = {
  BENCH: {
    label: 'Bench',
    version: 25,
    port: 6620
  },
  BENCHTEST: {
    label: 'BenchTest',
    version: 65,
    port: 6624
  }
}

export const bcorejs = bench
let currentNetwork = networksType.BENCH
let endpoint = seeds.BENCH[0]

/**
 * Query API
 * @return {Promise<Response>} Query result
 */
export const query = (url, params) => {
  return axios.get(`${getEndpoint()}/${url}`, {
    params: params
  })
  .then((res) => {
    return res.data
  })
  .catch((err) => {
    return err
  })
}

/**
 * Post to API
 * @return {Promise<Response>} Post result
 */
export const post = (url, data) => {
  return getNetHash()
    .then((nethash) => {
      const dataReq = JSON.stringify({ transactions: [data] })
      return axios.post(`${getEndpoint()}/${url}`, dataReq, {
        headers: {
          'Content-Type': 'application/json',
          'version': '0.3.0',
          'port': 1,
          'nethash': nethash
        }
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        return err
      })
    })
}

/**
 * Return API endpoint
 * @return {string} Endpoint
 */
export const getEndpoint = () => {
  return endpoint
}

/**
 * Get network
 * @return {Object} Current network
 */
export const getNetwork = () => {
  return currentNetwork
}

/**
 * Set network
 * @param {string} network - Network name to use
 * @param {string} url - Set a custom API endpoint
 */
export const setNetwork = (network, url = null) => {
  if (network != null) network = formatNetworkType(network)
  switch(network) {
    case networksType.BENCHTEST.label: {
      currentNetwork = networksType.BENCHTEST
      bcorejs.crypto.setNetworkVersion(networksType.BENCHTEST.version)
      endpoint = seeds.BENCHTEST[0]
    } break
    case networksType.BENCH.label : {
      currentNetwork = networksType.BENCH
      bcorejs.crypto.setNetworkVersion(networksType.BENCH.version)
      endpoint = seeds.BENCH[0]
    } break
  }
  if (url != null) {
    if (!url.startsWith('http')) url = `http://${url}`
    endpoint = url
  }
}

/**
 * Get seeds for the current network type
 * If network given, return seeds of this network
 * @return {array} Seeds list
 */
export const getSeeds = (network = null) => {
  if (network != null) {
    network = formatNetworkType(network) // Format network label
  } else {
    return seeds[getNetwork().label.toUpperCase()]
  }
  switch(network) {
    case networksType.BENCH.label: return seeds.BENCH
    case networksType.BENCHTEST.label: return seeds.BENCHTEST
  }
}

/**
 * Get all seeds
 * @return {Object} Seeds list
 */
export const getAllSeeds = () => {
  return seeds
}

/**
 * Build url query from object
 * @param {Object} - Query params
 * @return {Promise<Response>} URL param query
 */
export const queryBuilder = (data) => {
  if (data == null || Object.keys(data).length === 0) return ''
  return Object.keys(data).map((key) => {
    return [key, data[key]].map(encodeURIComponent).join("=")
  }).join("&")
}

/**
 * Generate a public / private key pair from random mnemonic
 * @param {string} [passphrase] - Passphrase to get keys from
 * @return {Object} Private/public key pair
 */
export const getKeys = (passphrase = null) => {
  // Get keys from passphrase if present or generate a random one
  let code = (passphrase == null) ? new Mnemonic() : passphrase
  const keys = bcorejs.crypto.getKeys(code.toString())
  const address = bcorejs.crypto.getAddress(keys.publicKey)
  return {
    publicKey: keys.publicKey,
    privateKey: keys.d.toBuffer().toString('hex'),
    passphrase: code.toString(),
    address: address
  }
}

/**
 * Format network type
 * @param {string} network - Network type
 * @return {string} Formatted network type
 */
const formatNetworkType = (network) => {
  return network.charAt(0).toUpperCase() + network.slice(1)
}

/**
 * Get the second signature fee
 * @return {Promise<Response>} Fee
 */
export const getSecondSignatureFee = () => {
  return query(`api/signatures/fee`)
  .then((res) => {
    return res.fee
  })
}
