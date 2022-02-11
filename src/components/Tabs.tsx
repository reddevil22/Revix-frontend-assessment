import { ITimeInterval } from "../utils";

interface ITabs {
    intervals: ITimeInterval[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Tabs({ intervals, onChange }: ITabs) {
    return (
        <div className="grid grid-cols-6 bg-gray-200 rounded-xl p-2 space-x-2 w-[40rem]" x-data="app" onChange={onChange}>
            {intervals.map((interval, index) => {
                return (
                    <div>
                        <input type="radio" name="option" id={interval.label} className="peer" hidden value={interval.interval} defaultChecked={index === 0} />
                        <label htmlFor={interval.label}
                            className="block text-center rounded-xl p-2 cursor-pointer select-none peer-checked:bg-blue-500 peer-checked:text-white peer-checked:font-bold">{interval.label}</label>
                    </div>
                );
            })}
        </div>
    );
}