import { useState } from 'react';
import {  Combobox, useCombobox} from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const opt= ['Relevance', 'Most Recent', 'Salary (Low to High)', 'Salary (High to Low)'];

const Sort=()=> {
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option value={item} key={item} className='text-xs'>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      

      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          
            <div onClick={()=>combobox.toggleDropdown()}className='cursor-pointer gap-2 px-2 py-1 text-sm flex border border-[#03C988] items-center px-2 py-1 rounded-xl'>
                {selectedItem}
                <IconAdjustments className='text-[#03C988] h-5 w-5'/>
            </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}

export default Sort