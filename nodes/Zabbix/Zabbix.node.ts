import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import {
	historyFields,
	historyOperations,
	itemFields,
	itemOperations,
	problemFields,
	problemOperations
} from './descriptions';

import {
	convertBooleanToFlag,
	convertBooleanToNumber,
	simplify,
	validateJSON,
	zabbixApiRequest,
} from './GenericFunctions';

export class Zabbix implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zabbix',
		name: 'zabbix',
		icon: 'file:zabbix.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Zabbix API',
		defaults: {
				name: 'Zabbix',
				color: '#d40000',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'zabbixApi',
				required: true,
				displayOptions: {
					show: {
						authentication: [
							'credentials',
						],
					},
				},
			},
			{
				name: 'zabbixTokenApi',
				required: true,
				displayOptions: {
					show: {
						authentication: [
							'apiToken',
						],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Credentials',
						value: 'credentials',
					},
					{
						name: 'API Token',
						value: 'apiToken',
					},
				],
				default: 'credentials',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'History',
						value: 'history',
					},
					{
						name: 'Item',
						value: 'item',
					},
					{
						name: 'Problem',
						value: 'problem',
					},
				],
				default: 'item',
				required: true,
				description: 'Resource to consume',
			},
			...historyOperations,
			...historyFields,
			...itemOperations,
			...itemFields,
			...problemOperations,
			...problemFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'history') {
					if (operation === 'get') {

						// ----------------------------------------
						//             history: get
						// ----------------------------------------

						// https://www.zabbix.com/documentation/5.0/en/manual/api/reference/history/get

						const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;

						let params: IDataObject;
						if(jsonParameters) {
							const queryParametersJson = this.getNodeParameter('queryParametersJson', i);
							
							if (queryParametersJson instanceof Object) {
								// if it is an object
								params = queryParametersJson as IDataObject;
							} else {
								// if it is a string
								if (validateJSON(queryParametersJson as string) !== undefined) {
									params = JSON.parse(queryParametersJson as string) as IDataObject;
								} else {
									throw new NodeOperationError(this.getNode(), 'Message (JSON) must be a valid json');
								}
							}
							
						} else {
							params = this.getNodeParameter('queryParametersUi', i) as IDataObject;

							if(params.hostids) {
								params.hostids = (params.hostids as IDataObject[]).map(a => a.id);
							}
							if(params.itemids) {
								params.itemids = (params.itemids as IDataObject[]).map(a => a.id);
							}
							// TODO: adjust type query
						}

						responseData = await zabbixApiRequest.call(
							this,
							'history.get',
							params,
						);
						if(responseData.error) {
							throw new NodeOperationError(this.getNode(), responseData.error);
						}
						responseData = simplify(responseData);
					}

				} else if (resource === 'item') {
					// if (operation === 'create') {
					//
					// 	// ----------------------------------------
					// 	//             item: create
					// 	// ----------------------------------------
					//
					// } else if (operation === 'delete'){
					//
					// 	// ----------------------------------------
					// 	//             item: delete
					// 	// ----------------------------------------
					//
					// } else
					if (operation === 'get'){

						// ----------------------------------------
						//             item: get
						// ----------------------------------------

						// https://www.zabbix.com/documentation/5.0/en/manual/api/reference/item/get

						const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;

						let params: IDataObject;
						if(jsonParameters) {
							const queryParametersJson = this.getNodeParameter('queryParametersJson', i);

							if (queryParametersJson instanceof Object) {
								// if it is an object
								params = queryParametersJson as IDataObject;
							} else {
								// if it is a string
								if (validateJSON(queryParametersJson as string) !== undefined) {
									params = JSON.parse(queryParametersJson as string) as IDataObject;
								} else {
									throw new NodeOperationError(this.getNode(), 'Message (JSON) must be a valid json');
								}
							}

						} else {
							params = this.getNodeParameter('queryParametersUi', i) as IDataObject;

							if(params.follow_redirects) {
								params.follow_redirects = convertBooleanToNumber(params.follow_redirects as boolean);
							} // type: integer
							if(params.headers) {
								params.headers = (params.headers as IDataObject).header;
							} // type: object
							if(params.output_format) {
								params.output_format = convertBooleanToNumber(params.output_format as boolean);
							} // type: integer
							if(params.itemids) {
								params.itemids = (params.itemids as IDataObject[]).map(a => a.id);
							}
							if(params.groupids) {
								params.groupids = (params.groupids as IDataObject[]).map(a => a.id);
							}
							if(params.templateids) {
								params.templateids = (params.templateids as IDataObject[]).map(a => a.id);
							}
							if(params.hostids) {
								params.hostids = (params.hostids as IDataObject[]).map(a => a.id);
							}
							if(params.proxyids) {
								params.proxyids = (params.proxyids as IDataObject[]).map(a => a.id);
							}
							if(params.interfaceids) {
								params.interfaceids = (params.interfaceids as IDataObject[]).map(a => a.id);
							}
							if(params.applicationids) {
								params.applicationids = (params.applicationids as IDataObject[]).map(a => a.id);
							}
							if(params.graphids) {
								params.graphids = (params.graphids as IDataObject[]).map(a => a.id);
							}
							if(params.triggerids) {
								params.triggerids = (params.triggerids as IDataObject[]).map(a => a.id);
							}
							if(params.applicationids) {
								params.applicationids = (params.applicationids as IDataObject[]).map(a => a.id);
							}
							if(params.webitems !== undefined && params.webitems) {
								params.webitems = convertBooleanToFlag(params.webitems as boolean);
							} // type - flag
							// TODO: adjust type query
						}

						responseData = await zabbixApiRequest.call(
							this,
							'item.get',
							params,
						);
						if(responseData.error) {
							throw new NodeOperationError(this.getNode(), responseData.error);
						}
						responseData = simplify(responseData);
					}
					// else if (operation === 'update'){
					//
					// 	// ----------------------------------------
					// 	//             item: update
					// 	// ----------------------------------------
					//
					// }

				} else if (resource === 'problem') {
					if (operation === 'get') {

						// ----------------------------------------
						//             problem: get
						// ----------------------------------------

						// https://www.zabbix.com/documentation/5.0/en/manual/api/reference/problem/get

						const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;

						let params: IDataObject;
						if(jsonParameters) {
							const queryParametersJson = this.getNodeParameter('queryParametersJson', i);

							if (queryParametersJson instanceof Object) {
								// if it is an object
								params = queryParametersJson as IDataObject;
							} else {
								// if it is a string
								if (validateJSON(queryParametersJson as string) !== undefined) {
									params = JSON.parse(queryParametersJson as string) as IDataObject;
								} else {
									throw new NodeOperationError(this.getNode(), 'Message (JSON) must be a valid json');
								}
							}

						} else {
							params = this.getNodeParameter('queryParametersUi', i) as IDataObject;

							if(params.tags) {
								params.tags = (params.tags as IDataObject).tags;
							} // type: array of objects
							if(params.eventids) {
								params.eventids = (params.eventids as IDataObject[]).map(a => a.id);
							} // type: string/array
							if(params.groupids) {
								params.groupids = (params.groupids as IDataObject[]).map(a => a.id);
							} // type: string/array
							if(params.hostids) {
								params.hostids = (params.hostids as IDataObject[]).map(a => a.id);
							} // type: string/array
							if(params.objectids) {
								params.objectids = (params.objectids as IDataObject[]).map(a => a.id);
							} // type: string/array
							if(params.applicationids) {
								params.applicationids = (params.applicationids as IDataObject[]).map(a => a.id);
							} // type: string/array
							if(params.severities) {
								params.severities = (params.severities as IDataObject[]).map(a => a.severityNumber);
							} // type: integer/array
							// TODO: adjust type query
						}

						responseData = await zabbixApiRequest.call(
							this,
							'problem.get',
							params,
						);
						if(responseData.error) {
							throw new NodeOperationError(this.getNode(), responseData.error);
						}
						responseData = simplify(responseData);
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}