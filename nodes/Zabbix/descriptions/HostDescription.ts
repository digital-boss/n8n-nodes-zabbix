import {
	INodeProperties,
} from 'n8n-workflow';

import {
	getCommonGetParameters,
	limitSelects,
	preserveKeys,
	searchInventory,
	selectApplicationsQuery,
	selectDiscoveriesQuery,
	selectDiscoveryRuleQuery,
	selectGraphsQuery,
	selectGroupsQuery,
	selectHostDiscoveryQuery,
	selectHttpTestsQuery,
	selectInterfacesQuery,
	selectInventoryQuery,
	selectItemsQuery,
	selectMacrosQuery,
	selectParentTemplatesQuery,
	selectScreensQuery, selectTagsQuery,
	selectTriggersQuery,
} from './shared';

export const hostOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'host',
				],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve host data according to the given parameters',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'This method allows to update existing hosts',
			},
		],
		default: 'get',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const hostFields = [

	/*-------------------------------------------------------------------------- */
	/*                                host:get                             	 	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'host',
				],
				operation: [
					'get',
				],
			},
		},
		default: false,
		description: 'Add parameters as JSON.',
	},
	{
		displayName: 'See <a href="https://www.zabbix.com/documentation/5.0/en/manual/api/reference/host/get" target="_blank">Zabbix documentation</a> on history.get properties',
		name: 'jsonNotice',
		type: 'notice',
		displayOptions: {
			show: {
				resource: [
					'host',
				],
				operation: [
					'get',
				],
				jsonParameters: [
					true,
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Parameters JSON',
		name: 'parametersJson',
		type: 'json',
		displayOptions: {
			show: {
				resource: [
					'host',
				],
				operation: [
					'get',
				],
				jsonParameters: [
					true,
				],
			},
		},
		default: '',
		description: 'Parameters as JSON (flat object) or JSON string.',
	},
	{
		displayName: 'Parameters',
		name: 'parametersUi',
		placeholder: 'Add Parameter',
		type: 'collection',
		displayOptions: {
			show: {
				resource: [
					'host',
				],
				operation: [
					'get',
				],
				jsonParameters: [
					false,
				],
			},
		},
		description: 'The query parameter to send.',
		default: {},
		options: [
			{
				displayName: 'Group IDs',
				name: 'groupids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Group',
				},
				placeholder: 'Add Group ID',
				default: {},
				description: 'Return only hosts that belong to the given groups.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the group.',
					},
				],
			},
			{
				displayName: 'Application IDs',
				name: 'applicationids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Application',
				},
				placeholder: 'Add Application ID',
				default: {},
				description: 'Return only hosts that have the given applications.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the application.',
					},
				],
			},
			{
				displayName: 'Discovered Service IDs',
				name: 'dserviceids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Discovered Service',
				},
				placeholder: 'Add Discovered Service ID',
				default: {},
				description: 'Return only hosts that are related to the given discovered services.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the discovered service.',
					},
				],
			},
			{
				displayName: 'Graph IDs',
				name: 'graphids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Graph',
				},
				placeholder: 'Add Graph ID',
				default: {},
				description: 'Return only hosts that have the given graphs.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the graph.',
					},
				],
			},
			{
				displayName: 'Host IDs',
				name: 'hostids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Host',
				},
				placeholder: 'Add Host ID',
				default: {},
				description: 'Return only hosts with the given host IDs.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the host.',
					},
				],
			},
			{
				displayName: 'HTTP Test IDs',
				name: 'httptestids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add HTTP Test',
				},
				placeholder: 'Add HTTP Test ID',
				default: {},
				description: 'Return only hosts that have the given web checks.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the HTTP test.',
					},
				],
			},
			{
				displayName: 'Interface IDs',
				name: 'interfaceids',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Interface',
				},
				placeholder: 'Add Interface ID',
				default: {},
				description: 'Return only hosts that use the given interfaces.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the interface.',
					},
				],
			},
			{
				displayName: 'Item IDs',
				name: 'itemids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Item',
				},
				placeholder: 'Add Item ID',
				default: {},
				description: 'Return only hosts that have the given items.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the item.',
					},
				],
			},
			{
				displayName: 'Maintenance IDs',
				name: 'maintenanceids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Maintenance',
				},
				placeholder: 'Add Maintenance ID',
				default: {},
				description: 'Return only hosts that are affected by the given maintenances.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the maintenance.',
					},
				],
			},
			{
				displayName: 'Monitored Hosts',
				name: 'monitored_hosts',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only monitored hosts.',
			},
			{
				displayName: 'Proxy Hosts',
				name: 'proxy_hosts',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only proxies.',
			},
			{
				displayName: 'Proxy IDs',
				name: 'proxyids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Proxy',
				},
				placeholder: 'Add Proxy ID',
				default: {},
				description: 'Return only hosts that are monitored by the given proxies.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the proxy.',
					},
				],
			},
			{
				displayName: 'Templated Hosts',
				name: 'proxyids',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return both hosts and templates.',
			},
			{
				displayName: 'Template IDs',
				name: 'templateids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Template',
				},
				placeholder: 'Add Template ID',
				default: {},
				description: 'Return only hosts that are linked to the given templates.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the template.',
					},
				],
			},
			{
				displayName: 'Trigger IDs',
				name: 'triggerids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Trigger',
				},
				placeholder: 'Add Trigger ID',
				default: {},
				description: 'Return only hosts that have the given triggers.',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the trigger.',
					},
				],
			},
			{
				displayName: 'With Items',
				name: 'with_items',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return both hosts and templates.',
			},
			{
				displayName: 'With Item Prototypes',
				name: 'with_item_prototypes',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only hosts that have item prototypes. Overrides the with_simple_graph_item_prototypes parameter.',
			},
			{
				displayName: 'With Simple Graph Item Prototypes',
				name: 'with_simple_graph_item_prototypes',
				type: 'boolean', //type - flag
				default: false,
				description: 'Return only hosts that have item prototypes, which are enabled for creation and have numeric type of information.',
			},
			{
				displayName: 'With Applications',
				name: 'with_applications',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only hosts that have applications.',
			},
			{
				displayName: 'With Graphs',
				name: 'with_graphs',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only hosts that have graphs.',
			},
			{
				displayName: 'With Graph Prototypes',
				name: 'with_graph_prototypes',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only hosts that have graph prototypes.',
			},
			{
				displayName: 'With Http Tests',
				name: 'with_httptests',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only hosts that have web checks. Overrides the with_monitored_httptests parameter.',
			},
			{
				displayName: 'With Monitored Http Tests',
				name: 'with_monitored_httptests',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only hosts that have enabled web checks.',
			},
			{
				displayName: 'With Monitored Items',
				name: 'with_monitored_items',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only hosts that have enabled items. Overrides the with_simple_graph_items parameter.',
			},
			{
				displayName: 'With Monitored Triggers',
				name: 'with_monitored_triggers', // type - flag
				type: 'boolean',
				default: false,
				description: 'Return only hosts that have enabled triggers. All of the items used in the trigger must also be enabled.',
			},
			{
				displayName: 'With Simple Graph Items',
				name: 'with_simple_graph_items',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only hosts that have items with numeric type of information.',
			},
			{
				displayName: 'With Triggers',
				name: 'with_triggers',
				type: 'boolean', // type - flag
				default: false,
				description: 'Return only hosts that have triggers. Overrides the with_monitored_triggers parameter.',
			},
			{
				displayName: 'With Problems Suppressed',
				name: 'withProblemsSuppressed',
				type: 'options',
				typeOptions: {},
				default: '',
				description: 'Return hosts that have suppressed problems.',
				options: [
					{
						name: 'null - (default) all hosts',
						value: '',
					},
					{
						name: 'true - only hosts with suppressed problems',
						value: true,
					},
					{
						name: 'false - only hosts with unsuppressed problems',
						value: false,
					},
				],
			},
			{
				displayName: 'Eval Type',
				name: 'evaltype',
				type: 'options',
				default: 0,
				description: 'Rules for tag searching.',
				options: [
					{
						name: '0 - (default) And/Or',
						value: 0,
					},
					{
						name: '2 - Or',
						value: 2,
					},
				],
			},
			{
				displayName: 'Severities',
				name: 'severities',
				type: 'collection', // type - integer/array
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Severity',
				},
				placeholder: 'Add Severity Number',
				default: {},
				description: 'Return only problems with given event severities. Applies only if object is trigger.',
				options: [
					{
						displayName: 'Severity Number',
						name: 'severityNumber',
						type: 'number',
						default: 0,
						description: 'Number of the severity.',
					},
				],
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Tag',
				default: {tags: []},
				description: 'Return only hosts with given tags. Exact match by tag and case-sensitive or case-insensitive search by tag value depending on operator value. An empty array returns all hosts.',
				options: [
					{
						displayName: 'Tags',
						name: 'tags',
						values: [
							{
								displayName: 'Tag',
								name: 'tag',
								type: 'string',
								default: '',
								description: 'Tag name.',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Search value.',
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								default: 0,
								description: 'Search operator.',
								options: [
									{
										name: '0 - (default) Contains',
										value: 0,
									},
									{
										name: '1 - Equal',
										value: 1,
									},
								],
							},
						],
					},
				],
			},
			{
				displayName: 'Inherited Tags',
				name: 'inheritedTags',
				type: 'boolean',
				default: false,
				description: 'Return hosts that have given tags also in all of their linked templates. Possible values: true - linked templates must also have given tags; false - (default) linked template tags are ignored.',
			},

			...selectApplicationsQuery,
			...selectDiscoveriesQuery,
			...selectDiscoveryRuleQuery,
			...selectGraphsQuery,
			...selectGroupsQuery,
			...selectHostDiscoveryQuery,
			...selectHttpTestsQuery,
			...selectInterfacesQuery,
			...selectInventoryQuery,
			...selectItemsQuery,
			...selectMacrosQuery,
			...selectParentTemplatesQuery,
			...selectScreensQuery,
			...selectTagsQuery,

			{
				displayName: 'Select Inherited Tags',
				name: 'selectInheritedTags',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return an inheritedTags property.',
				options: [
					{
						name: 'Extend',
						value: 'extend',
						description: 'Returns all object properties',
					},
				],
			},

			...selectTriggersQuery,
			...limitSelects,
			...searchInventory,

			...getCommonGetParameters('host'),
			...preserveKeys,
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                host:update                             	 */
	/* ------------------------------------------------------------------------- */

	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'host',
				],
				operation: [
					'update',
				],
			},
		},
		default: false,
		description: 'Add parameters as JSON.',
	},
	{
		displayName: 'See <a href="https://www.zabbix.com/documentation/5.0/en/manual/api/reference/host/update" target="_blank">Zabbix documentation</a> on history.update properties. ' +
			'This method is only available to Admin and Super admin user types. ' +
			'Permissions to call the method can be revoked in user role settings. See User roles for more information.',
		name: 'jsonNotice',
		type: 'notice',
		displayOptions: {
			show: {
				resource: [
					'host',
				],
				operation: [
					'update',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Parameters JSON',
		name: 'parametersJson',
		type: 'json',
		displayOptions: {
			show: {
				resource: [
					'host',
				],
				operation: [
					'update',
				],
				jsonParameters: [
					true,
				],
			},
		},
		default: '',
		description: 'Parameters as JSON (flat object) or JSON string.',
	},
	{
		displayName: 'Host ID',
		name: 'hostid',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['host'],
				operation: ['update'],
				jsonParameters: [false],
			},
		},
		default: '',
	},
	{
		displayName: 'Parameters',
		name: 'parametersUi',
		placeholder: 'Add Parameter',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['host'],
				operation: ['update'],
				jsonParameters: [false],
			},
		},
		description: 'The query parameter to send.',
		default: {},
		options: [
			{
				displayName: 'Host',
				name: 'host',
				type: 'string',
				default: '',
				description: 'Technical name of the host',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the host',
			},
			{
				displayName: 'Inventory Mode',
				name: 'inventory_mode',
				type: 'options',
				default: -1,
				description: 'Host inventory population mode',
				options: [
					{
						name: '-1 - (default) disabled',
						value: -1,
					},
					{
						name: '0 - manual',
						value: 0,
					},
					{
						name: '1 - automatic',
						value: 1,
					},
				],
			},
			{
				displayName: 'IPAMI Authtype',
				name: 'ipmi_authtype',
				type: 'options',
				default: -1,
				description: 'IPMI authentication algorithm',
				options: [
					{
						name: '-1 - (default) default',
						value: -1,
					},
					{
						name: '0 - none',
						value: 0,
					},
					{
						name: '1 - MD2',
						value: 1,
					},
					{
						name: '2 - MD5',
						value: 2,
					},
					{
						name: '4 - straight',
						value: 4,
					},
					{
						name: '5 - OEM',
						value: 5,
					},
					{
						name: '6 - RMCP+',
						value: 6,
					},
				],
			},
			{
				displayName: 'IPAMI Password',
				name: 'ipmi_password',
				type: 'string',
				default: '',
				description: 'IPMI password',
			},
			{
				displayName: 'IPAMI Privilege',
				name: 'ipmi_privilege',
				type: 'options',
				default: 2,
				description: 'IPMI privilege level',
				options: [
					{
						name: '1 - callback',
						value: 1,
					},
					{
						name: '2 - (default) user',
						value: 2,
					},
					{
						name: '3 - operator',
						value: 3,
					},
					{
						name: '4 - admin',
						value: 5,
					},
					{
						name: '5 - OEM',
						value: 5,
					},
				],
			},
			{
				displayName: 'IPAMI Username',
				name: 'ipmi_username',
				type: 'string',
				default: '',
				description: 'IPMI username',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Visible name of the host. ' +
					'Default: host property value.',
			},
			{
				displayName: 'Proxy Host ID',
				name: 'proxy_hostid',
				type: 'string',
				default: '',
				description: 'ID of the proxy that is used to monitor the host',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 0,
				description: 'Status and function of the host.',
				options: [
					{
						name: '0 - (default) monitored host',
						value: 0,
					},
					{
						name: '1 - unmonitored host',
						value: 1,
					},
				],
			},
			{
				displayName: 'TLS Connect',
				name: 'tls_connect',
				type: 'options',
				default: 1,
				description: 'Connections to host',
				options: [
					{
						name: '1 - (default) No encryption',
						value: 1,
					},
					{
						name: '2 - PSK',
						value: 2,
					},
					{
						name: '4 - certificate',
						value: 4,
					},
				],
			},
			{
				displayName: 'TLS Accept',
				name: 'tls_accept',
				type: 'options',
				default: 1,
				description: 'Connections from host',
				options: [
					{
						name: '1 - (default) No encryption',
						value: 1,
					},
					{
						name: '2 - PSK',
						value: 2,
					},
					{
						name: '4 - certificate',
						value: 4,
					},
				],
			},
			{
				displayName: 'TLS Issuer',
				name: 'tls_issuer',
				type: 'string',
				default: '',
				description: 'Certificate issuer',
			},
			{
				displayName: 'TLS Subject',
				name: 'tls_subject',
				type: 'string',
				default: '',
				description: 'Certificate subject',
			},
			{
				displayName: 'TLS PSK Identity',
				name: 'tls_psk_identity',
				type: 'string',
				default: '',
				description: 'PSK identity. Required if either tls_connect or tls_accept has PSK enabled. ' +
					'Do not put sensitive information in the PSK identity, ' +
					'it is transmitted unencrypted over the network to inform a receiver which PSK to use.',
			},
			{
				displayName: 'TLS PSK',
				name: 'tls_psk',
				type: 'string',
				default: '',
				description: 'The preshared key, at least 32 hex digits. ' +
					'Required if either tls_connect or tls_accept has PSK enabled.',
			},
			{
				displayName: 'Active Available',
				name: 'active_available',
				type: 'options',
				default: 0,
				description: 'Host active interface availability status',
				options: [
					{
						name: '0 - interface status is unknown',
						value: 0,
					},
					{
						name: '1 - interface is available',
						value: 1,
					},
					{
						name: '2 - interface is not available',
						value: 2,
					},
				],
			},
			{
				displayName: 'TLS PSK',
				name: 'tls_psk',
				type: 'string',
				default: '',
				description: 'The preshared key, at least 32 hex digits. ' +
					'Required if either tls_connect or tls_accept has PSK enabled.',
			},
			{
				displayName: 'Groups',
				name: 'groups',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: 'Host groups to replace the current host groups the host belongs to. ' +
					'The host groups must have the groupid property defined. ' +
					'All host groups that are not listed in the request will be unlinked.',
				options: [
					{
						displayName: 'Group ID',
						name: 'groupid',
						type: 'string',
						default: '',
						description: 'ID of the host group',
					},
				],
			},
			// {
			// 	displayName: 'Groups',
			// 	name: 'groups',
			// 	type: 'fixedCollection',
			// 	typeOptions: {
			// 		multipleValues: true,
			// 		multipleValueButtonText: 'Add Group',
			// 	},
			// 	default: '',
			// 	description: 'Host groups to replace the current host groups the host belongs to. ' +
			// 		'The host groups must have the groupid property defined. ' +
			// 		'All host groups that are not listed in the request will be unlinked.',
			// 	options: [
			// 		{
			// 			name: 'metadataValues',
			// 			displayName: 'Metadata',
			// 			values: [
			// 				{
			// 					displayName: 'Group ID',
			// 					name: 'groupid',
			// 					required: true,
			// 					type: 'string',
			// 					default: '',
			// 					description: 'ID of the host group',
			// 				},
			// 				{
			// 					displayName: 'Name',
			// 					name: 'name',
			// 					type: 'string',
			// 					default: '',
			// 					description: ' Name of the host group',
			// 				},
			// 				{
			// 					displayName: 'Flags',
			// 					name: 'flags',
			// 					type: 'options',
			// 					default: '',
			// 					description: 'Origin of the host group',
			// 					options: [
			// 						{
			// 							name: '0 - a plain host group',
			// 							value: 0,
			// 						},
			// 						{
			// 							name: '4 - a discovered host group',
			// 							value: 4,
			// 						},
			// 					],
			// 				},
			// 			],
			// 		},
			// 	],
			// },
			{
				displayName: 'Interfaces',
				name: 'interfaces',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: 'Host interfaces to replace the current host interfaces. ' +
					'All interfaces that are not listed in the request will be removed.',
				options: [
					{
						displayName: 'Interface ID',
						name: 'interfaceid',
						type: 'string',
						default: '',
						description: 'ID of the interface',
					},
				],
			},
			// {
			// 	displayName: 'Interfaces',
			// 	name: 'interfaces',
			// 	type: 'fixedCollection',
			// 	typeOptions: {
			// 		multipleValues: true,
			// 		multipleValueButtonText: 'Add Interface',
			// 	},
			// 	default: '',
			// 	description: 'Host interfaces to replace the current host interfaces. ' +
			// 		'All interfaces that are not listed in the request will be removed.',
			// 	options: [
			// 		{
			// 			name: 'metadataValues',
			// 			displayName: 'Metadata',
			// 			values: [
			// 				{
			// 					displayName: 'Interface ID',
			// 					name: 'interfaceid',
			// 					type: 'string',
			// 					default: '',
			// 					description: 'ID of the interface',
			// 				},
			// 				{
			// 					displayName: 'DNS',
			// 					name: 'dns',
			// 					type: 'string',
			// 					default: '',
			// 					description: 'DNS name used by the interface. ' +
			// 						'Can be empty if the connection is made via IP.',
			// 				},
			// 				{
			// 					displayName: 'Name',
			// 					name: 'name',
			// 					type: 'string',
			// 					default: '',
			// 					description: ' Name of the host group',
			// 				},
			// 				{
			// 					displayName: 'Flags',
			// 					name: 'flags',
			// 					type: 'options',
			// 					default: '',
			// 					description: 'Origin of the host group',
			// 					typeOptions: [
			// 						{
			// 							name: '0 - a plain host group',
			// 							value: 0,
			// 						},
			// 						{
			// 							name: '4 - a discovered host group',
			// 							value: 4,
			// 						},
			// 					],
			// 				},
			// 			],
			// 		},
			// 	],
			// },
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: 'Host tags to replace the current host tags. ' +
					'All tags that are not listed in the request will be removed.',
				options: [
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description: 'Host tag name',
					},
				],
			},
			// {
			// 	displayName: 'Tags',
			// 	name: 'tags',
			// 	type: 'fixedCollection',
			// 	typeOptions: {
			// 		multipleValues: true,
			// 	},
			// 	default: '',
			// 	description: 'Host tags to replace the current host tags. ' +
			// 		'All tags that are not listed in the request will be removed.',
			// 	options: [
			// 		{
			// 			name: 'metadataValues',
			// 			displayName: 'Metadata',
			// 			values: [
			//
			// 				{
			// 					displayName: 'Tag',
			// 					name: 'tag',
			// 					required: true,
			// 					type: 'string',
			// 					default: '',
			// 					description: 'Host tag name',
			// 				},
			// 				{
			// 					displayName: 'Value',
			// 					name: 'value',
			// 					type: 'string',
			// 					default: '',
			// 					description: 'Host tag value',
			// 				},
			// 				{
			// 					displayName: 'Automatic',
			// 					name: 'automatic',
			// 					type: 'options',
			// 					default: 0,
			// 					description: 'Type of host tag',
			// 					options: [
			// 						{
			// 							name: '0 - (default) manual (tag created by user)',
			// 							value: 0,
			// 						},
			// 						{
			// 							name: '1 - automatic (tag created by low-level discovery)',
			// 							value: 1,
			// 						},
			// 					],
			// 				},
			// 			],
			// 		},
			// 	],
			// },
			{
				displayName: 'Inventory',
				name: 'inventory',
				type: 'collection',
				default: '',
				description: 'Host inventory properties',
				options: [
					{
						displayName: 'Alias',
						name: 'alias',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Asset Tag',
						name: 'asset_tag',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Chassis',
						name: 'chassis',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Contact',
						name: 'contact',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Contact Number',
						name: 'contract_number',
						type: 'string',
						default: '',
					},
					{
						displayName: 'HW Decommissioning Date',
						name: 'date_hw_decomm',
						type: 'string',
						default: '',
					},
					{
						displayName: 'HW Maintenance Expiry Date',
						name: 'date_hw_expiry',
						type: 'string',
						default: '',
					},
					{
						displayName: 'HW Installation Date',
						name: 'date_hw_install',
					},
					{
						displayName: 'HW Purchase Date',
						name: 'date_hw_purchase',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Deployment Status',
						name: 'deployment_status',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Hardware',
						name: 'hardware',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Detailed Hardware',
						name: 'hardware_full',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Host Netmask',
						name: 'host_netmask',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Host Networks',
						name: 'host_networks',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Host Router',
						name: 'host_router',
						type: 'string',
						default: '',
					},
					{
						displayName: 'HW Architecture',
						name: 'hw_arch',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Installer Name',
						name: 'installer_name',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Location Latitude',
						name: 'location_lat',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Location Longitude',
						name: 'location_lon',
						type: 'string',
						default: '',
					},
					{
						displayName: 'MAC Address A',
						name: 'macaddress_a',
						type: 'string',
						default: '',
					},
					{
						displayName: 'MAC Address B',
						name: 'macaddress_b',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Model',
						name: 'model',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Notes',
						name: 'notes',
						type: 'string',
						default: '',
					},
					{
						displayName: 'OOB IP Address',
						name: 'oob_ip',
						type: 'string',
						default: '',
					},
					{
						displayName: 'OOB Host Subnet Mask',
						name: 'oob_netmask',
						type: 'string',
						default: '',
					},
					{
						displayName: 'OOB Router',
						name: 'oob_router',
						type: 'string',
						default: '',
					},
					{
						displayName: 'OS Name',
						name: 'os',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Detailed OS Name',
						name: 'os_full',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Short OS Name',
						name: 'os_short',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Primary POC Mobile Number',
						name: 'poc_1_cell',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Primary Email',
						name: 'poc_1_email',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Primary POC Name',
						name: 'poc_1_name',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Primary POC Notes',
						name: 'poc_1_notes',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Primary POC Phone A',
						name: 'poc_1_phone_a',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Primary POC Phone B',
						name: 'poc_1_phone_b',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Primary POC Screen Name',
						name: 'poc_1_screen',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Secondary POC Mobile Number',
						name: 'poc_2_cell',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Secondary POC Email',
						name: 'poc_2_email',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Secondary POC Name',
						name: 'poc_2_name',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Secondary POC Notes',
						name: 'poc_2_notes',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Secondary POC Phone A',
						name: 'poc_2_phone_a',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Secondary POC Phone B',
						name: 'poc_2_phone_b',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Secondary POC Screen Name',
						name: 'poc_2_screen',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Serial Number A',
						name: 'serialno_a',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Serial Number B',
						name: 'serialno_b',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Site Address A',
						name: 'site_address_a',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Site Address B',
						name: 'site_address_b',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Site Address C',
						name: 'site_address_c',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Site City',
						name: 'site_city',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Site Country',
						name: 'site_country',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Site Notes',
						name: 'site_notes',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Site Rack Location',
						name: 'site_rack',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Site State',
						name: 'site_state',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Site Zip/Postal Code',
						name: 'site_zip',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Software',
						name: 'software',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Software Application A',
						name: 'software_app_a',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Software Application B',
						name: 'software_app_b',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Software Application C',
						name: 'software_app_c',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Software Application D',
						name: 'software_app_d',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Software Application E',
						name: 'software_app_e',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Software Details',
						name: 'software_full',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Type Details',
						name: 'type_full',
						type: 'string',
						default: '',
					},
					{
						displayName: 'URL A',
						name: 'url_a',
						type: 'string',
						default: '',
					},
					{
						displayName: 'URL B',
						name: 'url_b',
						type: 'string',
						default: '',
					},
					{
						displayName: 'URL C',
						name: 'url_c',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Vendor',
						name: 'vendor',
						type: 'string',
						default: '',
					},
				],
			},
			{
				displayName: 'Macros',
				name: 'macros',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: 'User macros to replace the current user macros. ' +
					'All macros that are not listed in the request will be removed.',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [

							{
								displayName: 'Macro',
								name: 'macro',
								type: 'string',
								default: '',
								description: 'Macro string',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value of the macro',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								default: 0,
								description: 'Type of macro',
								options: [
									{
										name: '0 - (default) Text macro',
										value: 0,
									},
									{
										name: '1 - Secret macro',
										value: 1,
									},
									{
										name: '2 - Vault secret',
										value: 1,
									},
								],
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'Description  of the macro',
							},
						],
					},
				],
			},
			{
				displayName: 'Templates',
				name: 'templates',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: 'Templates to replace the currently linked templates. ' +
					'All templates that are not listed in the request will be only unlinked. ' +
					'The templates must have the templateid property defined.',
				options: [
					{
						displayName: 'Template ID',
						name: 'templateid',
						type: 'string',
						default: '',
					},
				],
			},
			{
				displayName: 'Templates Clear',
				name: 'templates_clear',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: 'Templates to unlink and clear from the host. ' +
					'The templates must have the templateid property defined.',
				options: [
					{
						displayName: 'Template ID',
						name: 'templateid',
						type: 'string',
						default: '',
					},
				],
			},

		],
	},

] as INodeProperties[];
