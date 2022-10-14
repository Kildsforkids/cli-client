import React from 'react';

interface OutputFieldProps {
    value: string;
    isLoading: boolean;
}

export default function OutputField({ value, isLoading }: OutputFieldProps) {

    return (
        <div className="self-stretch mx-20 mt-5">
              <textarea
                  readOnly
                  id="textarea"
                rows={20}
                  placeholder={isLoading ? 'Loading...' : 'Output log'}
                  value={value}
                className="form-control block w-full px-5 py-2 text-base font-normal bg-zinc-900 text-white bg-clip-padding rounded transition ease-in-out m-0 focus:outline-none">
              </textarea>
          </div>
    );
}
