import {
    IDataObject, INodeProperties
} from 'n8n-workflow';

/*-------------------------------------------------------------------------- */
/*                       Common "get" method parameters	                     */
/* ------------------------------------------------------------------------- */

// https://www.zabbix.com/documentation/5.0/en/manual/api/reference_commentary#common-get-method-parameters

export function getCommonGetParameters(resource: string) {
    const commonGetParameters = [
        {
            displayName: 'Count Output',
            name: 'countOutput',
            type: 'boolean',
            default: true,
            description: 'Return the number of records in the result instead of the actual data.',
        },
        {
            displayName: 'Editable',
            name: 'editable',
            type: 'boolean',
            default: true,
            description: 'If set to true, return only objects that the user has write permissions to. Default: false.',
        },
        {
            displayName: 'Exclude Search',
            name: 'excludeSearch',
            type: 'boolean',
            default: true,
            description: 'Return results that do not match the criteria given in the search parameter.',
        },
        getFilterNotice(resource),
        {
            displayName: 'Filter',
            name: 'filter',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: true,
            },
            default: {},
            description: 'Return only those results that exactly match the given filter.',
            options: [
                {
                    displayName: 'Filter',
                    name: 'filter',
                    values: [
                        {
                            displayName: 'Key',
                            name: 'key',
                            type: 'string',
                            default: '',
                            description: 'The property name.',
                        },
                        {
                            displayName: 'Values',
                            name: 'values',
                            type: 'collection',
                            typeOptions: {
                                multipleValues: true,
                            },
                            placeholder: 'Add Value',
                            default: { value: '' },
                            description: 'An array of values to match against.',
                            options: [
                                {
                                    displayName: 'Value',
                                    name: 'value',
                                    type: 'string',
                                    default: '',
                                    description: 'A value to match against.',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Limit',
            name: 'limit',
            type: 'number',
            typeOptions: {
                minValue: 1,
                numberStepSize: 1,
            },
            default: '',
            description: 'Limit the number of records returned.',
        },
        {
            displayName: 'Output',
            name: 'output',
            type: 'string',
            default: 'extend',
            description: 'Object properties to be returned. Default: extend.',
        }, // TODO: type query
        {
            displayName: 'Preserve Keys',
            name: 'preservekeys',
            type: 'boolean',
            typeOptions: {
                multipleValues: true,
            },
            placeholder: 'Add Header',
            default: { header: [] },
            description: 'Use IDs as keys in the resulting array.',
        },
        {
            displayName: 'Search',
            name: 'search',
            type: 'fixedCollection',
            default: '',
            description: 'Return results that match the given wildcard search (case-insensitive). Works only for string and text fields. If no additional options are given, this will perform a LIKE "%…%" search.',
            options: [
                {
                    displayName: 'Property',
                    name: 'property',
                    values: [
                        {
                            displayName: 'Key',
                            name: 'key',
                            type: 'string',
                            default: '',
                            description: 'The property name.',
                        },
                        {
                            displayName: 'Value',
                            name: 'value',
                            type: 'string',
                            default: '',
                            description: 'A string to search for.',
                        },
                    ],
                },
            ],
        }, // TODO: type object
        {
            displayName: 'Headers',
            name: 'headers',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: true,
            },
            placeholder: 'Add Header',
            default: { header: [] },
            description: 'HTTP agent item field. Object with HTTP(S) request headers, where header name is used as key and header value as value.',
            options: [
                {
                    displayName: 'Header',
                    name: 'header',
                    values: [
                        {
                            displayName: 'Key',
                            name: 'key',
                            type: 'string',
                            default: '',
                            description: 'A header key.',
                        },
                        {
                            displayName: 'Value',
                            name: 'value',
                            type: 'string',
                            default: '',
                            description: 'A header value.',
                        },
                    ],
                },
            ],
        },



        {
            displayName: 'Search By Any',
            name: 'searchByAny',
            type: 'boolean',
            default: true,
            description: 'If set to true, return results that match any of the criteria given in the filter or search parameter instead of all of them. Default: false.',
        },
        {
            displayName: 'Search Wildcards Enabled',
            name: 'searchWildcardsEnabled',
            type: 'boolean',
            default: true,
            description: 'If set to true enables the use of "*" as a wildcard character in the search parameter. Default: false.',
        },
        {
            displayName: 'Sort Field',
            name: 'sortfield',
            type: 'multiOptions',
            default: [],
            description: 'Sort the result by the given properties.',
            options: [
                getSortfieldOptions(resource),
            ],
        },
        {
            displayName: 'Sort Order',
            name: 'sortorder',
            type: 'collection',
            typeOptions: {
                multipleValues: true,
                multipleValueButtonText: 'Add Sort',
            },
            placeholder: 'Add Sort Order',
            default: {},
            description: 'Order of sorting. If an array is passed, each value will be matched to the corresponding property given in the sortfield parameter.',
            options: [
                {
                    displayName: 'Order',
                    name: 'order',
                    type: 'options',
                    default: 'ASC',
                    options: [
                        {
                            name: 'ascending',
                            value: 'ASC',
                        },
                        {
                            name: 'descending',
                            value: 'DESC',
                        },
                    ],
                    description: 'Order of sorting.',
                },
            ],
        }, // type: string/array
        {
            displayName: 'Start Search',
            name: 'startSearch',
            type: 'boolean',
            default: true,
            description: 'The search parameter will compare the beginning of fields, that is, perform a LIKE "…%" search instead. Ignored if searchWildcardsEnabled is set to true.',
        },
    ];
    return commonGetParameters;
}

function getSortfieldOptions(resource: string){
    let options: IDataObject[] = [];
    switch (resource) {
        case 'history': {
            options = sortfieldOptionsHistory;
        }
        case 'item': {
            options = sortfieldOptionsItem;
        }
        case 'problem': {
            options = sortfieldOptionsProblem;
        }
        default: { }
    }
    return options;
}

function getFilterNotice(resource: string){
    switch (resource) {
        case 'history': { }
        case 'item': {
            return filterNoticeItem;
        }
        case 'problem': { }
        default: { }
    }
}

// Possible values for sorting of item:get
const sortfieldOptionsItem = [
    {
        name: 'Item ID',
        value: 'itemid',
    },
    {
        name: 'Name',
        value: 'name',
    },
    {
        name: 'Key',
        value: 'key_',
    },
    {
        name: 'Delay',
        value: 'delay',
    },
    {
        name: 'History',
        value: 'history',
    },
    {
        name: 'Trends',
        value: 'trends',
    },
    {
        name: 'Type',
        value: 'type',
    },
    {
        name: 'Status',
        value: 'status',
    },
];
// Notice for field parameter of item:get
const filterNoticeItem: INodeProperties = {
    displayName: 'See <a href="https://www.zabbix.com/documentation/5.0/en/manual/api/reference/item/get" target="_blank">Zabbix documentation</a> on items.get fields',
    name: 'jsonNotice',
    type: 'notice',
    default: '',
};

// Possible values for sorting of history:get
export const sortfieldOptionsHistory = [
    {
        name: 'Item ID',
        value: 'itemid',
    },
    {
        name: 'Clock',
        value: 'clock',
    },
];

// Possible values for sorting of history:get
export const sortfieldOptionsProblem = [
    {
        name: 'Event ID',
        value: 'eventid',
    },
];
