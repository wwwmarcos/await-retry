const defaultContext = {
  tries: 1,
  errors: []
}

const retry = async (fn, { tries = 1, context = defaultContext } = {}) => {
  try {
    const result = await fn()

    return {
      tries: context.tries,
      result,
      success: true
    }
  } catch (error) {
    if (tries === context.tries) {
      return {
        ...context,
        success: false
      }
    }

    return retry(fn, {
      tries,
      context: {
        tries: context.tries + 1,
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
