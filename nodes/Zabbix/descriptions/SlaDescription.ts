import {
	INodeProperties,
} from 'n8n-workflow';

import {
	getCommonGetParameters,
	preserveKeys,
} from './shared';

export const slaOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sla'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve SLA objects according to the given parameters',
			},
			{
				name: 'Get SLI',
				value: 'getsli',
				description: 'Calculate the Service Level Indicator (SLI) data',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'This method allows to update existing SLA entries',
			},
		],
		default: 'get',
		description: 'The operation to perform',
	},
] as INodeProperties[];

export const slaFields = [

	/*-------------------------------------------------------------------------- */
	/*                                	sla:get                             	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['sla'],
				operation: ['get'],
			},
		},
		default: false,
		description: 'Add parameters as JSON',
	},
	{
		displayName: 'See <a href="https://www.zabbix.com/documentation/5.0/en/manual/api/reference/sla/get" target="_blank">Zabbix documentation</a> on sla.get properties',
		name: 'jsonNotice',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['sla'],
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
				resource: ['sla'],
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
				resource: ['sla'],
				operation: ['get'],
				jsonParameters: [false],
			},
		},
		description: 'The query parameters to send',
		default: {},
		options: [
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
				description: 'Return only  SLAs with the given IDs',
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
				displayName: 'Service IDs',
				name: 'serviceids',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Service',
				},
				placeholder: 'Add Service ID',
				default: {},
				description: 'Return only SLAs matching the specific services',
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
				displayName: 'Select Schedule',
				name: 'selectSchedule',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return a schedule property with SLA schedules',
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
				displayName: 'Select Excluded Downtimes',
				name: 'selectExcludedDowntimes',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return an excluded_downtimes property with SLA excluded downtimes',
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
				displayName: 'Select Service Tags',
				name: 'selectServiceTags',
				type: 'options', // type - query
				default: 'extend',
				description: 'Return a service_tags property with SLA service tags',
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

			...getCommonGetParameters('sla'),
			...preserveKeys,
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                	sla:getsli                             	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['sla'],
				operation: ['getsli'],
			},
		},
		default: false,
		description: 'Add parameters as JSON',
	},
	{
		displayName: 'See <a href="https://www.zabbix.com/documentation/5.0/en/manual/api/reference/sla/getsli" target="_blank">Zabbix documentation</a> on sla.getsli properties',
		name: 'jsonNotice',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['sla'],
				operation: ['getsli'],
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
				resource: ['sla'],
				operation: ['getsli'],
				jsonParameters: [true],
			},
		},
		default: '',
		description: 'Parameters as JSON (flat object) or JSON string',
	},
	{
		displayName: 'SLA ID',
		name: 'slaid',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sla'],
				operation: ['getsli'],
				jsonParameters: [false],
			},
		},
		default: '',
		description: 'ID of the SLA',
	},
	{
		displayName: 'Parameters',
		name: 'parametersUi',
		placeholder: 'Add Parameter',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['sla'],
				operation: ['getsli'],
				jsonParameters: [false],
			},
		},
		description: 'The query parameters to send',
		default: {},
		options: [
			{
				displayName: 'Period From',
				name: 'period_from',
				type: 'number',
				default: '',
				description: 'Starting date (inclusive) to report the SLI for',
			},
			{
				displayName: 'Period To',
				name: 'period_to',
				type: 'number',
				default: '',
				description: 'Ending date (exclusive) to report the SLI for',
			},
			{
				displayName: 'Periods',
				name: 'periods',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: '',
				description: 'Preferred number of periods to report. Possible values: 1-100.',
			},
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
				description: 'IDs of services to return the SLI for',
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
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                	sla:update                             	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['sla'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Add parameters as JSON',
	},
	{
		displayName: 'See <a href="https://www.zabbix.com/documentation/5.0/en/manual/api/reference/sla/update" target="_blank">Zabbix documentation</a> on sla.update properties. ' +
			'Note: This method is only available to Admin and Super admin user types. ' +
			'Permissions to call the method can be revoked in user role settings.',
		name: 'jsonNotice',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['sla'],
				operation: ['update'],
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
				resource: ['sla'],
				operation: ['update'],
				jsonParameters: [true],
			},
		},
		default: '',
		description: 'Parameters as JSON (flat object) or JSON string',
	},
	{
		displayName: 'SLA ID',
		name: 'slaid',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sla'],
				operation: ['update'],
				jsonParameters: [false],
			},
		},
		default: '',
		description: 'ID of the SLA',
	},
	{
		displayName: 'Parameters',
		name: 'parametersUi',
		placeholder: 'Add Parameter',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['sla'],
				operation: ['update'],
				jsonParameters: [false],
			},
		},
		description: 'The query parameters to send',
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'ID of the SLA',
			},
			{
				displayName: 'Period',
				name: 'period',
				type: 'options',
				default: '',
				description: 'Reporting period of the SLA',
				options: [
					{
						name: '0 - daily',
						value: 0,
					},
					{
						name: '1 - weekly',
						value: 1,
					},
					{
						name: '2 - monthly',
						value: 2,
					},
					{
						name: '3 - quarterly',
						value: 3,
					},
					{
						name: '4 - annually',
						value: 4,
					},
				]
			},
			{
				displayName: 'SLO',
				name: 'slo',
				type: 'number',
				default: '',
				description: 'Minimum acceptable Service Level Objective expressed as a percent. ' +
					'If the Service Level Indicator (SLI) drops lower, the SLA is considered to be in problem/unfulfilled state. ' +
					'Possible values: 0-100 (up to 4 fractional digits).',
			},
			{
				displayName: 'Effective Date',
				name: 'effective_date',
				type: 'number',
				default: '',
				description: 'Effective date of the SLA. ' +
					'Possible values: date timestamp in UTC.',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'Reporting time zone, for example: Europe/London, UTC. ' +
					'For the full list of supported time zones please refer to PHP documentation.',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 0,
				description: 'Status of the SLA.',
				options: [
					{
						name: '0 - (default) disabled SLA',
						value: 0,
					},
					{
						name: '1 - enabled SLA',
						value: 1,
					},
				]
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the SLA',
			},
			{
				displayName: 'Service Tags',
				name: 'service_tags',
				type: 'fixedCollection',
				default: '',
				description: 'Return a service_tags property with SLA service tags',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Tag',
								name: 'tag',
								type: 'string',
								default: '',
								description: 'SLA service tag name',
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								default: 0,
								description: 'SLA service tag operator',
								typeOptions: [
									{
										name: '0 - (default) equals',
										value: 0,
									},
									{
										name: '2 - like',
										value: 2,
									},
								],
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'SLA service tag value',
							},
						],
					},
				],
			},
			{
				displayName: 'Schedule',
				name: 'schedule',
				type: 'fixedCollection',
				default: '',
				description: 'SLA schedule to replace the current one. Specifying parameter as empty will be interpreted as a 24x7 schedule.',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Period From',
								name: 'period_from',
								type: 'number',
								default: '',
								description: 'Starting time of the recurrent weekly period of time (inclusive).\n' +
									'Possible values: number of seconds (counting from Sunday).',
							},
							{
								displayName: 'Period To',
								name: 'period_to',
								type: 'number',
								default: '',
								description: 'Ending time of the recurrent weekly period of time (exclusive).\n' +
									'Possible values: number of seconds (counting from Sunday).',
							},
						],
					},
				],
			},
			{
				displayName: 'Excluded Downtimes',
				name: 'excluded_downtimes',
				type: 'fixedCollection',
				default: '',
				description: 'SLA excluded downtimes to replace the current ones.',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the excluded downtime',
							},
							{
								displayName: 'Period From',
								name: 'period_from',
								type: 'number',
								default: '',
								description: 'Starting time of the excluded downtime (inclusive).' +
									'Possible values: timestamp.',
							},
							{
								displayName: 'Period To',
								name: 'period_to',
								type: 'number',
								default: '',
								description: 'Ending time of the excluded downtime (exclusive).' +
									'Possible values: timestamp.',
							},
						],
					},
				],
			},

		],
	},

] as INodeProperties[];
