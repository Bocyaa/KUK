// import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { Ingredient } from '@app/types/recipe';
import { Button } from './Button';
import {
  ChatBubbleBottomCenterIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface Props {
  ingredient: Ingredient;
  index: number;
  onRemove: () => void;
  onUpdateComment: (index: number, comment: string) => void;
}

function IngredientRow({
  ingredient,
  index,
  onRemove,
  onUpdateComment,
}: Props) {
  const { name, quantity, unit, comment } = ingredient;
  const [showComment, setShowComment] = useState(false);
  const [commentValue, setCommentValue] = useState(ingredient.comment || '');

  function updateComment() {
    if (commentValue.trim()) {
      onUpdateComment(index, commentValue);
    }
    setShowComment(false);
  }

  return (
    <div className="mt-2 flex items-center justify-between rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b]">
      {showComment ? (
        <input
          autoFocus
          type="text"
          placeholder="Add comment ..."
          className="mx-1 my-1 w-full appearance-none rounded-lg bg-white px-2 py-1 focus:outline-none"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          onBlur={() => updateComment()}
        />
      ) : (
        <>
          <div className="no-scrollbar relative max-w-xs overflow-x-auto rounded-lg">
            <div className="flex min-w-max gap-1 whitespace-nowrap rounded-lg">
              <div className="flex flex-none items-center overflow-hidden rounded-lg border bg-white">
                <span className="px-5 py-1">{name}</span>
              </div>

              <div className="flex flex-none items-center overflow-hidden rounded-lg border bg-white px-4 py-1">
                <span>{quantity}&nbsp;</span>
                <span className="font-light text-gray-500">{unit}</span>
              </div>

              {comment && (
                <div className="flex flex-none items-center overflow-hidden rounded-lg border bg-white px-4 text-gray-400">
                  <span>{ingredient.comment}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            {comment ? (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowComment(!showComment)}
                className="flex flex-none rounded-lg border bg-white"
              >
                <ChatBubbleBottomCenterIconSolid className="h-3 w-3 text-[#0094f6]" />
              </Button>
            ) : (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowComment(!showComment)}
                className="flex flex-none rounded-lg border bg-white"
              >
                <ChatBubbleBottomCenterIcon className="h-3 w-3 text-[#0094f6]" />
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={onRemove}
              className="flex flex-none rounded-lg border bg-white"
            >
              <TrashIcon className="h-3 w-3 text-red-700" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default IngredientRow;

// TODO: Check for bugs
