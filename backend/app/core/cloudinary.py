import os
import uuid
import cloudinary
import cloudinary.uploader

from app.core.config import get_settings

settings = get_settings()

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


def upload_file(file_bytes: bytes, filename: str, folder: str = "labbitacora") -> dict:
    """Upload a file to Cloudinary and return {url, public_id}."""
    # We use a random UUID for the storage name to avoid any extension or naming issues.
    storage_name = str(uuid.uuid4())
    
    # Check if it's an image or a generic file (like PDF)
    ext = os.path.splitext(filename)[1].lower()
    resource_type = "image" if ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp'] else "raw"
    
    # For 'raw' resources (like PDFs), adding the extension back to the public_id
    # helps Cloudinary serve it with the right Content-Type and browser extension.
    public_id_with_ext = f"{storage_name}{ext}"

    result = cloudinary.uploader.upload(
        file_bytes,
        folder=folder,
        public_id=public_id_with_ext,
        resource_type=resource_type,
    )
    return {
        "url": result["secure_url"],
        "public_id": result["public_id"],
    }


def delete_file(public_id: str) -> bool:
    """Delete a file from Cloudinary by its public_id."""
    # We need to handle the case where we don't know the resource_type for deletion
    # But usually 'image' is the default. If not found, it might need 'raw'.
    try:
        result = cloudinary.uploader.destroy(public_id, resource_type="image")
        if result.get("result") != "ok":
            result = cloudinary.uploader.destroy(public_id, resource_type="raw")
        return result.get("result") == "ok"
    except Exception:
        return False
