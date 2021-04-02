import {
    required as createRequiredValidator,
    number as createNumberValidator,
} from 'ra-core';

export const required = createRequiredValidator();
export const number = createNumberValidator();
