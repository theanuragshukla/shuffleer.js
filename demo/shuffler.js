const sleep = ms => new Promise(r => setTimeout(r, ms))

const getRandomInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomCharacter = (characters) => {
	return characters[getRandomInteger(0, characters.length - 1)];
}

class Resolver {
	constructor(opts) {
		opts.loop = opts.loop === true ? true : false
		opts.resolveString = (opts.constant || '') + (opts.strings[this.counter++] || '') || ''
		opts.waitBeforeDelete = typeof opts.waitBeforeDelete === "number" ? opts.waitBeforeDelete : 1000
		opts.backSpaceTimeOut = typeof opts.backSpaceTimeOut === "number" ? opts.backSpaceTimeOut : 100
		this.counter = 0
		this.options = opts
		this.resolve()
	}

	update() {
		this.resolve()
	}

	resolve() {
		const opts = this.options
		const callback = () => {
			const loop = opts.loop === true ? true : false
			this.counter == this.options.strings.length && typeof this.options.onComplete === "function" && this.options.onComplete()
			if (!loop && this.counter >= this.options.strings.length) return
			this.counter %= this.options.strings.length
			this.options.resolveString = (this.options.constant || '') + (this.options.strings[this.counter++] || '') || '';
			this.doResolverEffect(this.options, callback)
		}
		this.options.offset = this.options.constant ? this.options.constant.length + 1 : 0
		this.doResolverEffect(this.options, callback);
	}

	doResolverEffect(options, callback) {
		const resolveString = options.resolveString;
		const len = resolveString.length
		const offset = options.offset;
		const partialString = resolveString.substring(0, offset);
		const combinedOptions = Object.assign({}, options, {
			partialString: partialString
		});
		this.doRandomiserEffect(combinedOptions, () => {
			const nextOptions = Object.assign({}, options, {
				offset: offset + 1
			});
			if (offset <= len) {
				this.doResolverEffect(nextOptions, callback);
			} else if (typeof callback === "function") {
				this.options.loop ? this.deleteText(callback) : callback()
			}
		});
	}

	doRandomiserEffect(options, callback) {
		const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '=']
		//      const characters=['0','1']
		const element = options.element;
		const partialString = options.partialString;
		let iterations = options.iterations;
		setTimeout(() => {
			if (iterations >= 0) {
				const nextOptions = Object.assign({}, options, {
					iterations: iterations - 1
				});
				if (iterations === 0) {
					element.textContent = partialString;
				} else {
					element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
				}
				this.doRandomiserEffect(nextOptions, callback);
			} else if (typeof callback === "function") {
				callback();
			}
		}, options.timeout);
	};
	async deleteText(cb) {
		const opts = this.options
		const elem = opts.element
		const pre = opts.constant
		await sleep(opts.waitBeforeDelete)
		while (pre !== elem.textContent) {
			elem.textContent = elem.textContent.slice(0, elem.textContent.length - 1)
			await sleep(opts.backSpaceTimeOut)
		}
		cb()
	}
}

