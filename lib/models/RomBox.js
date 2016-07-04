var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * RomBox Model
 * ==========
 */

var RomBox = new keystone.List('RomBox', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

RomBox.add({
	title: { type: String, required: true, initial:true },
	images: { type: Types.CloudinaryImages },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'RomBoxCategory', many: true },
	tags: Types.Text ,
	brand: { type: Types.Relationship, ref: 'Brand', index: true },
	chip: { type: Types.Relationship, ref: 'Chip', index: true },
	specs: { type: Types.Relationship, ref: 'Spec', many: true },
	roms: { type: Types.Relationship, ref: 'Rom', many: true },
	posts: { type: Types.Relationship, ref: 'ForumPost', many: true },
	howtos: { type: Types.Relationship, ref: 'HowTo', many: true },
	tools: { type: Types.Relationship, ref: 'Tool', many: true },
	
});

RomBox.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

RomBox.schema.virtual('desc').get(function() {
	return this.description.extended || this.description.brief;
});

RomBox.relationship({ ref: 'Tool', path: 'romboxes', label: "Tools" });
RomBox.relationship({ ref: 'Rom', path: 'romboxes', label: "ROMS" });
RomBox.relationship({ ref: 'HowTo', path: 'romboxes', label: "How To" });
RomBox.relationship({ ref: 'ForumPost', path: 'romboxes', label: "Mentions" });


RomBox.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
RomBox.register();
