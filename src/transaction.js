import { query, post, bcorejs, queryBuilder } from './api'

/**
 * Get an array of the last transactions on the network
 * @return {Promise<Response>} Transactions array
 */
export const getTransactions = (options) => {
  const params = queryBuilder(options)
  return query(`api/transactions?${params}`)
  .then((res) => {
    return res.transactions
  })
}

/**
 * Get transaction list
 * @param {string} - Address to get transactions from
 * @return {Promise<Response>} Transactions
 */
export const getTransactionsFromAddress = (address, options) => {
  return getTransactions({
    recipientId: address,
    senderId: address,
    ...options
  })
  .then((res) => {
    return res
  })
}

/**
 * Get transaction by tx id
 * @param {string} - Transaction id
 * @return {Promise<Response>} Transaction details
 */
export const getTransactionById = (txid) => {
  return query(`api/transactions/get`, {
    id: txid
  })
  .then((res) => {
    return res.transaction
  })
}

/**
 * Create a transaction
 * @param {Object} - Transaction parameters
 * @return {Object} Transaction
 */
export const createTransaction = (data) => {
  let amount = data.amount * Math.pow(10, 8)
  return bcorejs.transaction.createTransaction(
    data.to,
    amount,
    data.message,
    data.passphrase,
    data.secondPassphrase
  )
}

/**
 * Create a vote transaction
 * @param {Object} - Transaction parameters
 * @return {Object} Transaction
 */
export const createVoteTransaction = (data) => {
  return bcorejs.vote.createVote(data.passphrase, data.delegates, data.secondPassphrase)
}

/**
 * Create a second signature transaction
 * @param {string} - Passphrase from account
 * @param {string} - secondPassphrase to set
 * @return {Object} Transaction
 */
export const createSecondPassTransaction = (passphrase, secondPassphrase) => {
  return bcorejs.signature.createSignature(passphrase, secondPassphrase)
}

/**
 * Submit transaction to network
 * @param {Object} - Transaction details
 * @return {Promise<Response>} RPC response from sending transaction
 */
export const sendTransaction = (tx) => {
  return post(`peer/transactions`, tx)
  .then((res) => {
    return res
  })
}

/**
 * Get an array of unconfirmed transactions on the network
 * @return {Promise<Response>} Unconfirmed txs array
 */
export const getUnconfirmedTransactions = () => {
  return query(`api/transactions/unconfirmed`)
  .then((res) => {
    return res.transactions
  })
}
