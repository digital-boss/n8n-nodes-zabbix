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

] as INodeProperties[];
