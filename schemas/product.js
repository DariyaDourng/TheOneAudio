export default {
  name: 'product',
  type: 'document',
  title: 'Products',
  fields: [
    { name: 'title', type: 'string', title: 'Product Title', validation: Rule => Rule.required() },
    { name: 'category', type: 'string', title: 'Category', options: { list: ['Amplifier','Turntable','Headphones','Speakers','Cables','DAC'] } },
    { name: 'priceText', type: 'string', title: 'Display Price', description: 'e.g. $1,200 or Contact for Pricing' },
    { name: 'badge', type: 'string', title: 'Badge Label', description: 'e.g. New Arrival, Flagship, Limited' },
    { name: 'mainImage', type: 'image', title: 'Main Image', options: { hotspot: true } },
    { name: 'specs', type: 'array', title: 'Technical Specifications', of: [{ type: 'string' }] },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
  ]
}
