var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Brand Model
 * ==================
 */

var Brand = new keystone.List('Brand', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Brand.add({
	name: { type: String, required: true, initial:true },
});

Brand.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

//Brand.relationship({ ref: 'Post', path: 'categories' });

Brand.defaultColumns = 'name,slug, owner|20%, state|20%, publishedDate|20%';

Brand.register();
