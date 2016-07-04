var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Spec Model
 * ==================
 */

var Spec = new keystone.List('Spec', {
	autokey: { from: 'name', path: 'slug', unique: true }
});

Spec.add({
	type: { type: Types.Relationship, ref: 'SpecType' },
	model: String,
	mfg: { type: Types.Relationship, ref: 'Manu' },
	name: { type: String, required: true, initial: true },
	url: { type: Types.Url },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
});

Spec.add('Manage', {
	owner: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	archivedDate: { type: Types.Date, index: true, dependsOn: { state: 'archived' } },
});

Spec.relationship({ ref: 'RomBox', path: 'specs' });

Spec.defaultColumns = 'name, type|20%, model|20%, mfg|20%';

Spec.register();
