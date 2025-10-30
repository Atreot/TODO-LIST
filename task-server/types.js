// types.js
/**
 * @typedef {Object} ITask
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {boolean} complete
 * @property {number} createdAt
 * @property {number} updatedAt
 * @property {number} userId
 */

/**
 * @typedef {Object} IUser
 * @property {number} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} [message]
 * @property {any} [data]
 */

module.exports = {
    // Экспортируем для использования на сервере
  };