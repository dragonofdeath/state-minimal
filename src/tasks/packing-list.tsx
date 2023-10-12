import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

let nextId = 3;

type Item = {
  id: number;
  title: string;
  packed: boolean;
};

const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

export default function PackingList() {
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(3);
  const [packed, setPacked] = useState(1);

  function handleAddItem(title: string) {
    setTotal(total + 1);
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false,
      },
    ]);
  }

  function handleChangeItem(nextItem: Item) {
    if (nextItem.packed) {
      setPacked(packed + 1);
    } else {
      setPacked(packed - 1);
    }
    setItems(
      items.map((item) => {
        if (item.id === nextItem.id) {
          return nextItem;
        } else {
          return item;
        }
      }),
    );
  }

  function handleDeleteItem(itemId: number) {
    setTotal(total - 1);
    setItems(items.filter((item) => item.id !== itemId));
  }

  return (
    <>
      <AddItem onAddItem={handleAddItem} />
      <ul>
        {items.map((item) => (
          <li className="flex items-center justify-left space-x-4 my-2">
            <Label>
              <Checkbox
                className="mr-2"
                checked={item.packed}
                onCheckedChange={(checked) => {
                  handleChangeItem({
                    ...item,
                    packed: !!checked,
                  });
                }}
              ></Checkbox>
              {item.title}
            </Label>
            <Button
              variant="secondary"
              onClick={() => {
                handleDeleteItem(item.id);
              }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <hr />
      <b>
        {packed} out of {total} packed!
      </b>
    </>
  );
}

// input with button
const AddItem: React.FC<{ onAddItem: (title: string) => void }> = ({
  onAddItem,
}) => {
  const [title, setTitle] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onAddItem(title);
        setTitle('');
      }}
      className="flex gap-2"
    >
      <Input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Button type="submit" className="w-[200px]">
        Add Item
      </Button>
    </form>
  );
};

// checkbox
