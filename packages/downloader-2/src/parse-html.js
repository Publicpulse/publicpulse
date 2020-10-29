const cheerio = require(`cheerio`)

const linkEls = {
	a: `href`,
	link: `href`,
	script: `src`,
	img: `src`,
	source: `srcset`,
}

module.exports = async function parseHtml(data){
	const $ = cheerio.load(data, { decodeEntities: false })

	for(let tag in linkEls){
		const attr = linkEls[tag]

		$(tag).each((_, el) => {
			const node = $(el)
			const url = node.attr(attr)
			if(url){
				this.addToQueue(url)
				const newUrl = this.convertUrl(url)
				node.attr(attr, newUrl)
			}
		})
	}

	return $.html()
}