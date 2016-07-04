var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Tool Model
 * ==================
 */

var Tool = new keystone.List('Tool', {
	autokey: { from: 'name', path: 'slug', unique: true }
});

Tool.add({
	name: { type: String, required: true, initial:true },
	url: { type: Types.Url, required: true, initial: true },
	post:  { type: Types.Url, required: true, initial: true },
	romboxes: { type: Types.Relationship, ref: 'RomBox', many: true }
});

Tool.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

Tool.relationship({ ref: 'RomBox', path: 'tools' });

Tool.defaultColumns = 'name, slug|20%, state|20%, publishedDate|20%';


Tool.register();
