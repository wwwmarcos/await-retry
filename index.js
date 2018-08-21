const defaultContext = {
  tentatives: 1,
  errors: []
}

const retry = async (fn, { tentatives = 1, context = defaultContext } = {}) => {
  try {
    const result = await fn()

    return {
      tentatives: context.tentatives,
      result,
      success: true
    }
  } catch (error) {
    if (tentatives === context.tentatives) {
      return {
        ...context,
        success: false
      }
    }

    return retry(fn, {
      tentatives,
      context: {
        tentatives: context.tentatives + 1,
        errors: [
          ...context.errors,
          error
        ]
      }
    })
  }
}

module.exports = {
  retry
}
