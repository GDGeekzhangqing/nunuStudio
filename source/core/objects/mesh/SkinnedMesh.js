"use strict";

/**
 * SkinnedMesh is a Mesh that has a Skeleton attached.
 * 
 * A skeleton contains bones that are used to animate the vertices of the geometry.
 * 
 * Based on THREE.SkinnedMesh documentation for the object can be found at https:// threejs.org/docs/index.html#Reference/Objects/SkinnedMesh
 * 
 * @class SkinnedMesh
 * @module Meshes
 * @param {Geometry} geometry Geometry used by this mesh
 * @param {Material} material Material used to shade the superficie of the geometry
 * @extends {THREE.SkinnedMesh}
 */
function SkinnedMesh(geometry, material)
{
	THREE._SkinnedMesh.call(this, geometry, material);

	this.name = "skinned";
	
	this.receiveShadow = true;
	this.castShadow = true;

	this.skeleton = null;
}

THREE._SkinnedMesh = THREE.SkinnedMesh;
THREE.SkinnedMesh = SkinnedMesh;

SkinnedMesh.prototype = Object.create(THREE._SkinnedMesh.prototype);

/**
 * Dispose mesh along with its material and geometry.
 * 
 * @method dispose
 */
SkinnedMesh.prototype.dispose = function()
{
	if(this.material !== null && this.material.dispose !== undefined)
	{
		this.material.dispose();
	}

	if(this.geometry !== null && this.geometry.dispose !== undefined)
	{
		this.geometry.dispose();
	}

	THREE.Object3D.prototype.dispose.call(this);
};

SkinnedMesh.prototype.toJSON = function(meta)
{
	var self = this;

	var data = THREE.Object3D.prototype.toJSON.call(this, meta, function(meta, object)
	{	
		if(self.skeleton !== null)
		{
			if(meta.skeletons[self.skeleton.uuid] === undefined)
			{
				meta.skeletons[self.skeleton.uuid] = self.skeleton.toJSON(meta);
			}

			object.skeleton = self.skeleton.uuid;
		}
	});

	if(this.bindMode !== undefined)
	{
		data.object.bindMode = this.bindMode;
	}

	if(this.bindMatrix !== undefined)
	{
		data.object.bindMatrix = this.bindMatrix.toArray();
	}
	
	return data;
};

/**
 * Geometry defined the object structure.
 *
 * @property geometry
 * @type {Geometry}
 */

/**
 * Material is used to define how the geometry surface is shaded.
 *
 * @property material
 * @type {Material}
*/

/**
 * Bind a skeleton to this SkinnedMesh. The bindMatrix gets saved to .bindMatrix property and the .bindMatrixInverse gets calculated.
 * 
 * This is called automatically in the constructor, and the skeleton is created from the bones of the Geometry passed in the constructor.
 * 
 * @method bind
 * @param {Skeleton} skeleton
 * @param {Matrix4} bindMatrix
 */
 
/**
 * Determines how the mesh triangles are constructed from the vertices.
 *
 * Only works when the geometry is a BufferGeometry.
 *
 * @property drawMode
 * @default TrianglesDrawMode
 */