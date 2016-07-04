var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * HowTo Model
 * ==========
 */

var HowTo = new keystone.List('HowTo', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

HowTo.add({
	title: { type: String, required: true, initial:true },
	url: { type: Types.Url, required: true, initial: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	romboxes: { type: Types.Relationship, ref: 'RomBox', many: true }
});

HowTo.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

HowTo.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

HowTo.relationship({ ref: 'RomBox', path: 'howtos' });


HowTo.defaultColumns = 'title, state|20%, slug, owner|20%, publishedDate|20%';

HowTo.register();
