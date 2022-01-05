import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import {
	ICredentialDataDecryptedObject,
	IDataObject,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

export async function zabbixApiRequest(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: string, params: IDataObject, uri?: string): Promise<any> { // tslint:disable-line:no-any

	const authenticationMethod = this.getNodeParameter('authentication', 0, 'serviceAccount') as string;

	let credentials: IDataObject;
	let token: string;
	if (authenticationMethod === 'credentials') {
		// Login with user and password
		credentials = await this.getCredentials('zabbixApi') as ICredentialDataDecryptedObject;

		if (credentials === undefined) {
			throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
		}

		const loginResponse = await login.call(this, credentials);

		if (loginResponse.result === undefined) {
			throw new NodeOperationError(this.getNode(), "Login wasn't successful.");
		}

		token = loginResponse.result as string;
	} else {
		// Login with API token
		credentials = await this.getCredentials('zabbixTokenApi') as ICredentialDataDecryptedObject;

		if (credentials === undefined) {
			throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
		}

		token = credentials.apiToken as string;
	}

	const options = getOptions(method, params, credentials, token, uri);

	// tslint:disable-next-line:no-any
	let responseData: Promise<any>;
	try {
		responseData = this.helpers.request!(options);

	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}

	if(authenticationMethod === 'credentials') {
		const logoutResponse = await logout.call(this, credentials, token);
		if (logoutResponse.result === undefined && logoutResponse.result !== true) {
			throw new NodeOperationError(this.getNode(), logoutResponse.message as string);
		}
	}

	return responseData;
}

function getOptions(method: string, params: IDataObject, credentials: IDataObject, token: string|null = null, uri?: string) {

	const options: OptionsWithUri = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		},
		body: {
			jsonrpc: "2.0",
			method,
			params,
			id: 1,
			auth: token,
		},
		uri: uri || credentials.url + '/api_jsonrpc.php',
		json: true,
	};

	return options;
}

function login(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	credentials: IDataObject): Promise<IDataObject> {

	const params: IDataObject = {
		user: credentials.user,
		password: credentials.password,
	};

	const options = getOptions("user.login", params, credentials, null);

	try {
		return this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

function logout(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	credentials: IDataObject, token: string): Promise<IDataObject> {

	const options = getOptions("user.logout",{}, credentials, token);

	try {
		return this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export function validateJSON(json: string | undefined): any { // tslint:disable-line:no-any
	let result;
	try {
		result = JSON.parse(json!);
	} catch (exception) {
		result = undefined;
	}
	return result;
}

/**
 * Simplifies the output
 *
 * @export
 * @param IDataObject data
 * @returns IDataObject
 */
export function simplify(responseData: IDataObject): IDataObject {
	if(Object.keys(responseData.result as IDataObject).length === 0) {
		// if responseData.result is empty
		return {
			success: true,
			message:  "No records got returned."
		};
	} else {
		return responseData.result as IDataObject;
	}

}

/**
 * Creates an object from an array of names values
 *
 * @export
 * @param Array<{key:string,value:string}> data
 * @returns IDataObject
 */
export function parseArrayToObject(data: Array<{key:string,values:string|number|IDataObject[]}>): IDataObject {
	const jsonData: IDataObject = {};
	if(data) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].key && data[i].values) {
				// if key and value exist
				if (Object.prototype.toString.call(data[i].values) === '[object Array]') {
					// if values is an array assign the key to values.value[]
					jsonData[data[i].key] = (data[i].values as IDataObject[]).map(a => a.value);
				} else {
					// if values is a string or number assign the key to values
					jsonData[data[i].key] = data[i].values;
				}
			}
		}
	}
	return jsonData;
}

export function convertBooleanToNumber(input: boolean): number {
	let value: number;
	if (input === true  ) {
		value = 1;
	} else {
		value = 0;
	}
	return value;
}
export function convertBooleanToFlag(input: boolean): number|null {
	let value: number|null;
	if (input === true ) {
		value = 1;
	} else {
		value = null;
	}
	return value;
}