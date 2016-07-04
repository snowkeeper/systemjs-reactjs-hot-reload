var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SpecType Model
 * ==================
 */

var SpecType = new keystone.List('SpecType', {
	autokey: { from: 'name', path: 'slug', unique: true }
});

SpecType.add({
	name: { type: String, required: true }
});

SpecType.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

SpecType.relationship({ ref: 'Spec', path: 'type' });


SpecType.defaultColumns = 'name, slug|20%, state|20%, publishedDate|20%';

SpecType.register();
