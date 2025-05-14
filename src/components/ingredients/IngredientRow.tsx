import { Ingredient } from '@app/types/recipe';
import { Button } from './Button';
import {
  ChatBubbleBottomCenterIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';
import FrontPrimaryCard from '../ui/controllers/FrontPrimaryCard';
import AutoScrollingText from './AutoScrollingText';

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
  const [isShowOptions, setIsShowOptions] = useState(false);

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
    <>
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
        <div className="w-full border-b pb-2 pt-1 first:pt-0 last:border-none last:pb-0">
          <div className="relative">
            <div className="no-scrollbar overflow-x-auto rounded-lg">
              <div className="flex min-w-max gap-1 whitespace-nowrap rounded-lg">
                <FrontPrimaryCard>
                  <span className="px-3 py-1 capitalize">{name}</span>
                </FrontPrimaryCard>

                <FrontPrimaryCard className="mr-20">
                  <div className="flex gap-1 px-4">
                    <span>{String(quantity).replace('.', ',')}</span>
                    <span className="font-light text-gray-500">{unit}</span>
                  </div>
                </FrontPrimaryCard>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 top-0 flex gap-1 bg-[#f3f2f8] px-1">
              {isShowOptions ? (
                <>
                  {comment ? (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowComment(!showComment)}
                      className="flex h-auto flex-none rounded-lg border bg-white"
                    >
                      <ChatBubbleBottomCenterIconSolid className="h-3 w-3 text-[#0094f6]" />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowComment(!showComment)}
                      className="flex h-auto flex-none rounded-lg border bg-white"
                    >
                      <ChatBubbleBottomCenterIcon className="h-3 w-3 text-[#0094f6]" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={onRemove}
                    className="flex h-auto flex-none rounded-lg border bg-white"
                  >
                    <TrashIcon className="h-3 w-3 text-red-700" />
                  </Button>
                </>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsShowOptions(!isShowOptions)}
                  className="flex h-auto flex-none rounded-lg border bg-white"
                >
                  <EllipsisHorizontalIcon className="h-4 w-4 text-[#0094f6]" />
                </Button>
              )}
            </div>
          </div>

          {comment && (
            <AutoScrollingText
              text={comment}
              className="mt-1 flex rounded-lg px-2 text-xs text-gray-400"
              capitalize={true}
              speed={15}
            />
          )}
        </div>
      )}
    </>
  );
}

export default IngredientRow;
