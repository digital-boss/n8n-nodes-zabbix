import {
	ICredentialType,
	INodeProperties,
	NodePropertyTypes,
} from 'n8n-workflow';

export class ZabbixTokenApi implements ICredentialType {
	name = 'zabbixTokenApi';
	displayName = 'Zabbix API Token';
	documentationUrl = 'zabbix';
	properties: INodeProperties[] = [
		{
			displayName: 'URL',
			name: 'url',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'Ignore SSL Issues (Insecure)',
			name: 'allowUnauthorizedCerts',
			type: 'boolean',
			default: false,
		},
		{
			displayName: 'Testing Mode',
			name: 'testingMode',
			type: 'boolean',
			default: false,
		},
	];
}