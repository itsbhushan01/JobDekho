import { Checkbox, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Slices/FilterSlice';



const MultiInput=(props:any)=> {
  const dispatch=useDispatch();
  const [data,setData]=useState<string[]>([]);
  useEffect(()=>{
      setData(props.Option)
  },[])

  console.log(props.Option)
 
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [value, setValue] = useState<string[]>([]);

  const [search,setSearch]=useState('');

  const handleValueSelect = (val: string) =>{
    if(val=="$create"){
      setValue((current) => current.includes(val) ? current.filter((v) => v !== val) : [...current, val])
      dispatch(updateFilter({[props.title]:[...value, search]}))
    }
    else{
      setValue((current) => current.includes(val) ? current.filter((v) => v !== val) : [...current, val])
      dispatch(updateFilter({[props.title]:value.includes(val)?value.filter((v)=>v!==val):[...value,val]}));
    }
  };

  const handleValueRemove = (val: string) =>{
    setValue((current) => current?.filter((v) => v !== val));
    setValue((current)=>current?.filter((v)=>v!==val))
  }

  const values = value
    .slice(
      0,
      1
    )
    .map((item) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
      </Pill>
    ));

   const options = data?.filter((item) => item.toLowerCase().includes(search.trim().toLowerCase())).map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        <Checkbox
            size='xs'
            color='yellow'
          checked={value.includes(item)}
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: 'none' }}
        />
        <span className='text-[#e1e1e1]'>{item}</span>
      </Group>
    </Combobox.Option>
  ));
  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput variant='unstyled' rightSection={<IconSelector/>} leftSection={<div className='text-[#03C988] p-2 bg-[#1c1c1c] rounded-full mr-3'><props.icon/></div>} pointer onClick={() => combobox.toggleDropdown()}>
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > 1 && (
                  <Pill>+{value.length  - 1} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder className='!text-[#e1e1e1]'>{props.title}</Input.Placeholder>
            )}

            
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search groceries"
          />
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default MultiInput