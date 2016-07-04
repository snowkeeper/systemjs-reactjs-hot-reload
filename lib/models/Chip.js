var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Chip = new keystone.List('Chip', {
	map: { name: 'type' },
	autokey: { path: 'slug', from: 'type', unique: true }
});

Chip.add({
	title: { type: String, required: true, initial:true },
	type: { type: String, required: true, initial:true },
	mfg: { type: Types.Relationship, ref: 'Manu' },
	images: { type: Types.CloudinaryImages },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	url: { type: Types.Url, required: true, initial: true, label: 'Website' },
	//categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	releasedDate: { type: Types.Date, index: true },
});

Chip.schema.virtual('info').get(function() {
	return this.content.extended || this.content.brief;
});

Chip.add('Characteristics', {
	structure: { label: 'CPU Structure (complexity):', type: Types.Text },
	width: { label: 'Width of Machine Word', type: Types.Select, options: '8 bit, 16 bit, 32 bit, 64 bit', default: '32 bit',  width: 'short' },
	bus: { label: 'Address bus', type: Types.Select, options: '8 bit, 16 bit, 32 bit, 64 bit', default: '32 bit',  width: 'short' },
	primary: { label: 'Primary (RAM) Data bus', type: Types.Select, options: '8 bit, 16 bit, 32 bit, 64 bit', default: '32 bit',  width: 'short' },
	secondary: { label: 'Secondary (ROM) Data bus', type: Types.Select, options: '8 bit, 16 bit, 32 bit, 64 bit', default: '32 bit',  width: 'short' },
});

Chip.add('Instruction Set', {
	sis: { label: 'Supported Instruction Set(s)', type: Types.Text },
	core: { label: 'CPU Core', type: Types.Text },
});

Chip.add('Caches', {
	cache1: { label: 'Level 1 cache per Core', type: Types.Text },
	cache2: { label: 'Level 2 cache per Core', type: Types.Text },
	cache3: { label: 'Level 3 cache per Core', type: Types.Text },
	cache4: { label: 'Level 4 cache per Core', type: Types.Text },
});

Chip.add('Technology', {
	semitech: { label: 'Semiconductor Technology', type: Types.Text },
	featureset: { label: 'Minimum Feature Size', type: Types.Text },
});

Chip.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

Chip.defaultColumns = 'type|20%, title, mfg|20%, publishedDate|20%';

Chip.register();
