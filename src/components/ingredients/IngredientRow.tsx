import Ingredient from '@app/types/IngredientTypes';
import { Button } from './Button';
import {
  ChatBubbleBottomCenterIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconSolid } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import FrontPrimaryCard from '../ui/FrontPrimaryCard';
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

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatically hide options after 2 seconds
  useEffect(() => {
    if (isShowOptions) {
      timerRef.current = setTimeout(() => {
        setIsShowOptions(false);
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isShowOptions]);

  // Reset timer when the comment button is clicked
  function handleCommentButtonClick() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowComment(!showComment);
    timerRef.current = setTimeout(() => {
      setIsShowOptions(false);
    }, 2000);
  }

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
            className="w-full appearance-none rounded-lg border bg-white px-2 py-1 focus:outline-none dark:border-transparent dark:bg-[#1a1a1a]"
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
              <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-[#afafaf]" />
            </button>
          )}
        </div>
      ) : (
        <div className="w-full border-b border-[#f1f1f1] pb-1 last:border-none last:pb-0 dark:border-transparent">
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

            <div className="absolute bottom-0 right-0 top-0 flex gap-1 bg-[#f9f9f9] pl-1 dark:bg-[#2c2c2e]">
              {isShowOptions ? (
                <>
                  <Button
                    id="commentButton"
                    size="icon"
                    variant="ghost"
                    onClick={handleCommentButtonClick}
                    className="flex h-auto flex-none rounded-lg border border-[#e6e6e6] bg-white dark:border-[#424242] dark:bg-[#212121] dark:active:bg-[#424242]"
                  >
                    {comment ? (
                      <ChatBubbleBottomCenterIconSolid className="h-3 w-3 text-[#0094f6]" />
                    ) : (
                      <ChatBubbleBottomCenterIcon className="h-3 w-3 text-[#0094f6]" />
                    )}
                  </Button>
                  <Button
                    id="deleteButton"
                    size="icon"
                    variant="ghost"
                    onClick={onRemove}
                    className="flex h-auto flex-none rounded-lg border border-[#e6e6e6] bg-white dark:border-[#424242] dark:bg-[#212121] dark:active:bg-[#424242]"
                  >
                    <TrashIcon className="h-3 w-3 text-red-700" />
                  </Button>
                </>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsShowOptions(!isShowOptions)}
                  className="flex h-auto flex-none rounded-lg border border-[#e6e6e6] bg-white dark:border-[#424242] dark:bg-[#212121] dark:active:bg-[#424242]"
                >
                  <EllipsisHorizontalIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {comment && (
            <AutoScrollingText
              className="mt-1 flex border-b px-2 pb-1 text-xs text-[#5d5d5d] dark:border-[#212121] dark:text-[#afafaf]"
              speed={10}
            >
              {comment}
            </AutoScrollingText>
          )}
        </div>
      )}
    </>
  );
}

export default IngredientRow;
