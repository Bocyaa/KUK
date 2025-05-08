import { Ingredient } from '@app/types/recipe';
import { Button } from './Button';
import {
  ChatBubbleBottomCenterIcon,
  TrashIcon,
  XMarkIcon,
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

  async function updateComment() {
    onUpdateComment(index, commentValue);
    setShowComment(false);
  }

  function clearComment(e: React.MouseEvent) {
    e.preventDefault();
    // Prevent onBlur from firing
    e.stopPropagation();

    onUpdateComment(index, '');
    setCommentValue('');
    setShowComment(false);
  }

  return (
    <div className="mt-2 flex justify-between rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b]">
      {showComment ? (
        <div className="relative flex w-full items-center">
          <input
            autoFocus
            type="text"
            placeholder="Add comment ..."
            className="w-full appearance-none rounded-lg border bg-white px-2 py-1 focus:outline-none"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            onBlur={(e) => {
              // Only call updateComment if it's not the clear button being clicked
              if (!e.relatedTarget || e.relatedTarget.id !== 'clear-button') {
                updateComment();
              }
            }}
          />

          {commentValue && (
            <button
              className="absolute right-3 z-10"
              onClick={clearComment}
              onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from firing
              type="button"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="no-scrollbar relative max-w-xs overflow-x-auto rounded-lg">
            <div className="flex min-w-max gap-1 whitespace-nowrap rounded-lg">
              <div className="flex flex-none items-center overflow-hidden rounded-lg border bg-white">
                <span className="px-3 py-1 first-letter:capitalize">
                  {name}
                </span>
              </div>

              <div className="flex flex-none items-center overflow-hidden rounded-lg border bg-white px-4 py-1">
                <span>{quantity}&nbsp;</span>
                <span className="font-light text-gray-500">{unit}</span>
              </div>
            </div>
            {comment && (
              <span className="mt-1 block pl-2 text-xs text-gray-400 first-letter:capitalize">
                {comment}
              </span>
            )}
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
