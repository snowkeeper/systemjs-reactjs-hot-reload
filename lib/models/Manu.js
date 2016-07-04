var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ChipMan Model
 * ==================
 */

var Manu = new keystone.List('Manu', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Manufacturers',
	singular: 'Manufacturer',
	plural: 'Manufacturers',
});

Manu.add({
	name: { type: String, required: true },
});

Manu.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

Manu.relationship({ ref: 'Chip', path: 'mfg' });

Manu.defaultColumns = 'name, owner|20%, state|20%, publishedDate|20%';

Manu.register();
