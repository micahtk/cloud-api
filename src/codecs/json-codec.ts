// This code is copied from https://github.com/gcanti/io-ts-types
// and is licensed separately from the rest of this codebase.
// Please see license text at the bottom of this file.

import * as t from 'io-ts';

export type JSONObject = { [key: string]: JSONType };
export interface JSONArray extends Array<JSONType> {}
export type JSONType = null | string | number | boolean | JSONArray | JSONObject;

export interface JSONTypeC extends t.RecursiveType<t.Type<JSONType>> {}

export const jsonCodec: JSONTypeC = t.recursion<JSONType>('JSONType', self =>
  t.union([
    t.null,
    t.string,
    t.number,
    t.boolean,
    t.array(self),
    t.record(t.string, self),
  ]),
);

/****************************************************************************

MIT License

Copyright (c) 2017 Giulio Canti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

****************************************************************************/
