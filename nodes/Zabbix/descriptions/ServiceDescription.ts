import {
	INodeProperties,
} from 'n8n-workflow';

import {
	getCommonGetParameters,
	preserveKeys,
} from './shared';

export const serviceOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['service'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve services according to the given parameters',
			},
		],
		default: 'get',
		description: 'The operation to perform',
	},
] as INodeProperties[];

export const serviceFields = [

	/*-------------------------------------------------------------------------- */
	/*                                service:get                             	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['get'],
			},
		},
		default: false,
		description: 'Add parameters as JSON',
	},
	{
		displayName: 'See <a href="https://www.zabbix.com/documentation/5.0/en/manual/api/reference/service/get" target="_blank">Zabbix documentation</a> on service.get properties',
		name: 'jsonNotice',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['get'],
				jsonParameters: [true],
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
				resource: ['service'],
				operation: ['get'],
				jsonParameters: [true],
			},
		},
		default: '',
		description: 'Parameters as JSON (flat object) or JSON string',
	},
	{
		displayName: 'Parameters',
		name: 'parametersUi',
		placeholder: 'Add Parameter',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['get'],
				jsonParameters: [false],
			},
		},
		description: 'The query parameters to send',
		default: {},
		options: [
			{
				displayName: 'Service IDs',
				name: 'serviceids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Service',
				},
				placeholder: 'Add Service ID',
				default: {},
				description: 'Return only services with the given IDs',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the service',
					},
				],
			},
			{
				displayName: 'Parent IDs',
				name: 'parentids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Parent',
				},
				placeholder: 'Add Parent ID',
				default: {},
				description: 'Return only services created that are linked to the given parent services',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the parent',
					},
				],
			},
			{
				displayName: 'Deep Parent IDs',
				name: 'deep_parentids',
				type: 'boolean', // flag
				default: false,
				description: 'Return all direct and indirect child services. Used together with Parent IDs.',
			},
			{
				displayName: 'Child IDs',
				name: 'childids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Child',
				},
				placeholder: 'Add Child ID',
				default: {},
				description: 'Return only services that are linked to the given child services',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the child',
					},
				],
			},
			{
				displayName: 'Eval Type',
				name: 'evaltype',
				type: 'options',
				default: 0,
				description: 'Rules for tag searching',
				options: [
					{
						name: '0 - (default) And/Or',
						value: 0,
					},
					{
						name: '2 - Or',
						value: 2,
					}
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
				default: {},
				description: 'Return only services with given tags. Exact match by tag and case-sensitive or case-insensitive search by tag value depending on operator value. An empty array returns all services.',
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
										name: '1 - Equals',
										value: 1,
									},
									{
										name: '2 - Does not contain',
										value: 2,
									},
									{
										name: '3 - Does not equal',
										value: 3,
									},
									{
										name: '4 - Exists',
										value: 4,
									},
									{
										name: '5 - Does not exist',
										value: 5,
									},
								],
							},
						],
					},
				],
			},
			{
				displayName: 'Problem Tags',
				name: 'problem_tags',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Problem Tag',
				default: {},
				description: 'Return only services with given problem tags. Exact match by tag and case-sensitive or case-insensitive search by tag value depending on operator value. An empty array returns all services.',
				options: [
					{
						displayName: 'Problem Tags',
						name: 'problem_tags',
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
										name: '1 - Equals',
										value: 1,
									},
									{
										name: '2 - Does not contain',
										value: 2,
									},
									{
										name: '3 - Does not equal',
										value: 3,
									},
									{
										name: '4 - Exists',
										value: 4,
									},
									{
										name: '5 - Does not exist',
										value: 5,
									},
								],
							},
						],
					},
				],
			},
			{
				displayName: 'Without Problem Tags',
				name: 'without_problem_tags',
				type: 'boolean', // flag
				default: false,
				description: 'Return only services without problem tags',
			},
			{
				displayName: 'SLA IDs',
				name: 'slaids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add SLA',
				},
				placeholder: 'Add SLA ID',
				default: {},
				description: 'Return only services that are linked to the specific SLA(s)',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the SLA',
					},
				],
			},
			{
				displayName: 'Select Children',
				name: 'selectChildren',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return a children property with the child services',
				options: [
					{
						name: 'Extend',
						value: 'extend',
						description: 'Returns all object properties',
					},
					{
						name: 'Count',
						value: 'count',
						description: 'Returns the number of retrieved records, supported only by certain subselects',
					},
				],
			},
			{
				displayName: 'Select Parents',
				name: 'selectParents',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return a parents property with the parent services',
				options: [
					{
						name: 'Extend',
						value: 'extend',
						description: 'Returns all object properties',
					},
					{
						name: 'Count',
						value: 'count',
						description: 'Returns the number of retrieved records, supported only by certain subselects',
					},
				],
			},
			{
				displayName: 'Select Tags',
				name: 'selectTags',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return a tags property with service tags',
				options: [
					{
						name: 'Extend',
						value: 'extend',
						description: 'Returns all object properties',
					},
					{
						name: 'Count',
						value: 'count',
						description: 'Returns the number of retrieved records, supported only by certain subselects',
					},
				],
			},
			{
				displayName: 'Select Problem Events',
				name: 'selectProblemEvents',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return a problem_events property with an array of problem event objects',
				options: [
					{
						name: 'Extend',
						value: 'extend',
						description: 'Returns all object properties',
					},
					{
						name: 'Count',
						value: 'count',
						description: 'Returns the number of retrieved records, supported only by certain subselects',
					},
				],
			},
			{
				displayName: 'Select Problem Tags',
				name: 'selectProblemTags',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return a problem_tags property with problem tags',
				options: [
					{
						name: 'Extend',
						value: 'extend',
						description: 'Returns all object properties',
					},
					{
						name: 'Count',
						value: 'count',
						description: 'Returns the number of retrieved records, supported only by certain subselects',
					},
				],
			},
			{
				displayName: 'Select Status Rules',
				name: 'selectStatusRules',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return a status_rules property with status rules',
				options: [
					{
						name: 'Extend',
						value: 'extend',
						description: 'Returns all object properties',
					},
					{
						name: 'Count',
						value: 'count',
						description: 'Returns the number of retrieved records, supported only by certain subselects',
					},
				],
			},
			{
				displayName: 'Select Status Timeline',
				name: 'selectStatusTimeline',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Status Timeline',
				default: {},
				description: 'Return a status_timeline property containing service state changes for given periods. Returns an array of entries containing a start_value property and an alarms array for the state changes within specified periods.',
				options: [
					{
						displayName: 'Status Timeline',
						name: 'statusTimeline',
						values: [
							{
								displayName: 'Period From',
								name: 'period_from',
								type: 'number',
								default: '',
								description: 'A starting date (inclusive; integer timestamp)',
							},
							{
								displayName: 'Period To',
								name: 'period_to',
								type: 'number',
								default: '',
								description: 'An ending date (exclusive; integer timestamp)',
							},
						],
					},
				],
			},

			...getCommonGetParameters('service'),
			...preserveKeys,
		],
	},

] as INodeProperties[];
