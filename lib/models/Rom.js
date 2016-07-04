var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Rom Model
 * ==================
 */

var Rom = new keystone.List('Rom', {
	autokey: { from: 'name', path: 'slug', unique: true }
});

Rom.add({
	name: { type: String, required: true, initial:true },
	url: { type: Types.Url, required: true, initial: true },
	romboxes: { type: Types.Relationship, ref: 'RomBox', many: true }
});

Rom.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

Rom.relationship({ ref: 'RomBox', path: 'roms' });

Rom.defaultColumns = 'name, url, slug|20%, state|20%';

Rom.register();
