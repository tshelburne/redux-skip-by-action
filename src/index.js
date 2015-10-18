import {batchedSubscribe} from 'redux-batched-subscribe';

/**
 * If an action contains a true value in metadata for skip, the subscribe call
 * will be skipped for that action. Given this, each individual action can
 * marked as an intermediate step in a larger action.
 */
export default function skipByAction(next) {
	return (...args) => {
		let skip = false
		const createBatchedStore = batchedSubscribe(cb => { if(!skip) cb() })(next)
		const store = createBatchedStore(...args)

		function dispatch(action) {
			if (action.meta && action.meta.skip) {
				skip = true
			}
			const res = store.dispatch(action)
			skip = false
			return res
		}

		return {
			...store,
			dispatch
		}
	}
}

export const skip = action => ({...action, meta: {...action.meta, skip: true}})
