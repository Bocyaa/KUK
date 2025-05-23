interface RecipeDescriptionProps {
  description: string;
  className?: string;
}

function RecipeDescription({
  description,
  className = '',
}: RecipeDescriptionProps) {
  const formatDescription = (text: string) => {
    if (!text) return '';
    // Remove trailing whitespace and add dot if not present
    const trimmed = text.trim();
    return trimmed.endsWith('.') ? trimmed : `${trimmed}.`;
  };

  return (
    <h4 className={`text-[#5d5d5d] dark:text-[#afafaf] ${className}`}>
      {formatDescription(description)}
    </h4>
  );
}

export default RecipeDescription;
