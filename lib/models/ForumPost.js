var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ForumPost Model
 * ==================
 */

var ForumPost = new keystone.List('ForumPost', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Relevant Webpages',
	singular: 'Relevant Webpage',
	plural: 'Relevant Webpages',
});

ForumPost.add({
	name: { type: String, required: true },
	url: { type: Types.Url, required: true, initial: true },
	romboxes: { type: Types.Relationship, ref: 'RomBox', many: true }
});

ForumPost.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

//ForumPost.relationship({ ref: 'RomBox', path: 'posts' });

ForumPost.defaultColumns = 'name, url|20%,slug, state|20%, publishedDate|20%';

ForumPost.register();
